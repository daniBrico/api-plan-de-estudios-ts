import { Temporal } from '@js-temporal/polyfill'
import type {
  canSendVerificationEmailReturn} from '../../../services/verification.service';
import {
  VerificationService,
} from '../../../services/verification.service'
import type { UserDocument } from '../../../types/domain/user'

const FIXED_DATE = Temporal.Instant.from('2025-01-01T12:00:00Z')

beforeAll(() => {
  jest.spyOn(Temporal.Now, 'instant').mockReturnValue(FIXED_DATE)

  jest
    .spyOn(Temporal.Now, 'plainDateISO')
    .mockReturnValue(FIXED_DATE.toZonedDateTimeISO('UTC').toPlainDate())

  jest.spyOn(Temporal.Now, 'timeZoneId').mockReturnValue('UTC')
})

afterAll(() => {
  jest.restoreAllMocks()
})

const mockUser = () =>
  ({
    email: 'test@mail.com',
    name: 'Test',
    verificationToken: 'token',
    verificationTokenExpires: new Date(Date.now() + 10000),
    verificationEmailAttempts: 0,
    lastVerificationEmailSentAt: null,
    save: jest.fn().mockResolvedValue(true),
  } as unknown as UserDocument)

describe('canSendVerificationEmail', () => {
  it('Allows sending an email if everything is OK', () => {
    const user = mockUser()

    const result: canSendVerificationEmailReturn =
      VerificationService.canSendVerificationEmail(user)

    const expected: canSendVerificationEmailReturn = {
      action: 'SEND',
      regenerateToken: false,
    }

    expect(result).toEqual(expected)
  })

  it('Block if the daily maximum is reached', () => {
    const user = mockUser()
    user.verificationEmailAttempts = 2

    const result = VerificationService.canSendVerificationEmail(user)

    // Debería establecer que no se reinicio el número de intentos
    // Y debería verificar qué pasa si se reinicia el número máximo de intentos antes de pasar a la línea que se fija si se paso del número máximo establecido por defecto (2)
    const expected: canSendVerificationEmailReturn = {
      action: 'BLOCKED',
      reason: 'MAX_ATTEMPTS_REACHED',
    }

    expect(result).toEqual(expected)
  })

  it('The maximum email attempts per day are reset.', () => {
    const user = mockUser()
    user.verificationEmailAttempts = 2
    user.lastVerificationEmailSentAt = new Date('2024-12-31T12:00:00Z')
    user.verificationTokenExpires = new Date(
      FIXED_DATE.epochMilliseconds - 1000 * 60 * 60 * 24
    )

    const result = VerificationService.canSendVerificationEmail(user)

    const expected: canSendVerificationEmailReturn = {
      action: 'SEND',
      regenerateToken: true,
    }

    expect(result).toEqual(expected)
  })

  it('Block if trying to resend too quickly', () => {
    const user = mockUser()
    // Five minutes before
    user.lastVerificationEmailSentAt = new Date('2025-01-01T11:55:00Z')

    const result = VerificationService.canSendVerificationEmail(user)

    const expected: canSendVerificationEmailReturn = {
      action: 'BLOCKED',
      reason: 'TOO_SOON',
    }

    expect(result).toEqual(expected)
  })

  it('Generate token if it does not exist', () => {
    const user = mockUser()
    user.verificationToken = null
    user.verificationTokenExpires = null

    const result = VerificationService.canSendVerificationEmail(user)

    const expected: canSendVerificationEmailReturn = {
      action: 'SEND',
      regenerateToken: true,
    }

    expect(result).toEqual(expected)
  })
})
