import type {
  VerificationResult} from '../../../services/verification.service';
import {
  VerificationService,
} from '../../../services/verification.service'
import type { UserDocument } from '../../../types/domain/user'

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

describe('handleUnverifiedUser', () => {
  it('Return TOO_SOON reason if canSendVerificationEmail is BLOCKED', async () => {
    jest
      .spyOn(VerificationService, 'canSendVerificationEmail')
      .mockReturnValue({
        action: 'BLOCKED',
        reason: 'TOO_SOON',
      })

    const user = mockUser()

    const result = await VerificationService.handleUnverifiedUser(user)

    const expected: VerificationResult = {
      status: 'TOO_SOON',
    }

    expect(result).toEqual(expected)
  })

  it('Return MAX_ATTEMPTS_REACHED reason if canSendVerificationEmail is BLOCKED', async () => {
    jest
      .spyOn(VerificationService, 'canSendVerificationEmail')
      .mockReturnValue({
        action: 'BLOCKED',
        reason: 'MAX_ATTEMPTS_REACHED',
      })

    const user = mockUser()

    const result = await VerificationService.handleUnverifiedUser(user)

    const expected: VerificationResult = {
      status: 'MAX_ATTEMPTS_REACHED',
    }

    expect(result).toEqual(expected)
  })

  it('Return EMAIL_SENT where decision.regenerateToken is true, and sendVerificationEmail is ok', async () => {
    jest
      .spyOn(VerificationService, 'canSendVerificationEmail')
      .mockReturnValue({
        action: 'SEND',
        regenerateToken: true,
      })

    const expires = new Date()
    expires.setDate(expires.getDate() + 1)

    jest.spyOn(VerificationService, 'generateTokenEmail').mockReturnValue({
      verificationToken: 'new-token',
      verificationTokenExpires: expires,
    })

    const user = mockUser()

    jest.spyOn(VerificationService, 'sendVerificationEmail').mockResolvedValue({
      ok: true,
      error: null,
    })

    const result = await VerificationService.handleUnverifiedUser(user)

    const expected: VerificationResult = {
      status: 'EMAIL_SENT',
    }

    expect(result).toEqual(expected)
    expect(user.verificationToken).toBe('new-token')
    expect(user.verificationTokenExpires).toEqual(expires)
    expect(user.lastVerificationEmailSentAt).toBeInstanceOf(Date)
    expect(user.verificationEmailAttempts).toBe(1)
  })

  it('Return SEND_FAILED where decision.regenerateToken is true, and sendVerificationEmail is not ok', async () => {
    jest
      .spyOn(VerificationService, 'canSendVerificationEmail')
      .mockReturnValue({
        action: 'SEND',
        regenerateToken: true,
      })

    const expires = new Date()
    expires.setDate(expires.getDate() + 1)

    jest.spyOn(VerificationService, 'generateTokenEmail').mockReturnValue({
      verificationToken: 'new-token',
      verificationTokenExpires: expires,
    })

    const user = mockUser()

    jest.spyOn(VerificationService, 'sendVerificationEmail').mockResolvedValue({
      ok: false,
      error: undefined,
    })

    const result = await VerificationService.handleUnverifiedUser(user)

    const expected: VerificationResult = {
      status: 'SEND_FAILED',
    }

    expect(result).toEqual(expected)
    expect(user.verificationToken).toBe('new-token')
    expect(user.verificationTokenExpires).toEqual(expires)
  })
})
