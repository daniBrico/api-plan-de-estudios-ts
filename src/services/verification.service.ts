import { randomUUID } from 'node:crypto'
import { User } from '../types/types'
import { Temporal } from '@js-temporal/polyfill'
import { Resend } from 'resend'
import { VERIFICATION_CONFIG, ENV } from '../config/config'

interface SendVerificationEmailProps {
  email: string
  token: string
  name: string
}

const { FRONTEND_URL_LOCAL } = process.env

const resend = new Resend(ENV.RESEND_API_KEY)

const {
  MIN_RESEND_INTERVAL_MINUTES,
  MAX_EMAIL_ATTEMPTS_PER_DAY,
  TOKEN_EXPIRATION_HOURS,
} = VERIFICATION_CONFIG

type VerificationDecision =
  | { action: 'BLOCKED'; reason: string }
  | { action: 'SEND'; regenerateToken: boolean }

type VerificationResult =
  | { status: 'EMAIL_SENT' }
  | { status: 'TOO_SOON' }
  | { status: 'MAX_ATTEMPTS_REACHED' }
  | { status: 'SEND_FAILED' }

interface CheckVerificationStatusReturn {
  statusCode: 'TOKEN_INVALID' | 'TOKEN_EXPIRED' | 'TOKEN_VALID'
}

export class VerificationService {
  static async handleUnverifiedUser(user: User): Promise<VerificationResult> {
    const decision = this.canSendVerificationEmail(user)

    if (decision.action === 'BLOCKED')
      return {
        status:
          decision.reason === 'TOO_SOON' ? 'TOO_SOON' : 'MAX_ATTEMPTS_REACHED',
      }

    if (decision.regenerateToken) {
      const { verificationToken, verificationTokenExpires } =
        this.generateTokenEmail()
      user.verificationToken = verificationToken
      user.verificationTokenExpires = verificationTokenExpires
    }

    const emailResult = await this.sendVerificationEmail({
      email: user.email,
      token: user.verificationToken!,
      name: user.name,
    })

    if (!emailResult.ok) return { status: 'SEND_FAILED' }

    user.lastVerificationEmailSentAt = new Date()
    user.verificationEmailAttempts += 1
    await user.save()

    return { status: 'EMAIL_SENT' }
  }

  static canSendVerificationEmail(user: User): VerificationDecision {
    const now = Temporal.Now.instant()

    // Daily reset of attempts
    // Reset daily verification email attempts if the last email was sent on a previous calendar day
    if (user.lastVerificationEmailSentAt) {
      const latSentDay = Temporal.Instant.from(
        user.lastVerificationEmailSentAt.toISOString()
      )
        .toZonedDateTimeISO(Temporal.Now.timeZoneId())
        .toPlainDate()

      const today = Temporal.Now.plainDateISO()

      if (!latSentDay.equals(today)) user.verificationEmailAttempts = 0
    }

    // Max attempts
    if (user.verificationEmailAttempts >= MAX_EMAIL_ATTEMPTS_PER_DAY)
      return {
        action: 'BLOCKED',
        reason: 'MAX_ATTEMPTS_REACHED',
      }

    if (user.lastVerificationEmailSentAt) {
      const lastSent = Temporal.Instant.from(
        user.lastVerificationEmailSentAt.toISOString()
      )

      const diff = now.since(lastSent, { largestUnit: 'minutes' })

      if (diff.minutes < MIN_RESEND_INTERVAL_MINUTES)
        return {
          action: 'BLOCKED',
          reason: 'TOO_SOON',
        }
    }

    // Invalid or expired token
    const shouldRegenerateToken =
      !user.verificationToken ||
      !user.verificationTokenExpires ||
      user.verificationTokenExpires.getTime() < now.epochMilliseconds

    return {
      action: 'SEND',
      regenerateToken: shouldRegenerateToken,
    }
  }

  static checkVerificationStatus(user: User): CheckVerificationStatusReturn {
    if (!user.verificationToken || !user.verificationTokenExpires)
      return { statusCode: 'TOKEN_INVALID' }

    if (user.verificationTokenExpires < new Date())
      return { statusCode: 'TOKEN_EXPIRED' }

    return { statusCode: 'TOKEN_VALID' }
  }

  static generateTokenEmail = () => {
    const verificationToken = randomUUID()
    const verificationTokenExpires = new Date(
      Temporal.Now.instant().add({
        hours: TOKEN_EXPIRATION_HOURS,
      }).epochMilliseconds
    )

    return { verificationToken, verificationTokenExpires }
  }

  static sendVerificationEmail = async ({
    email,
    token,
    name,
  }: SendVerificationEmailProps) => {
    try {
      const verifyUrl = `${FRONTEND_URL_LOCAL}/verify/email?token=${token}`

      const { error } = await resend.emails.send({
        from: 'Soporte <no-reply@resend.dev>',
        to: email,
        subject: 'Verifica tu cuenta',
        html: `
        <h2>Hola ${name}</h2>
        <p>Por favor, verifica tu cuenta haciendo click en el siguiente link:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>Este enlace vencerá en 24 horas.</p>
        `,
      })

      if (error) return { ok: false, error: error }

      return { ok: true, error: null }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error sending verification email: ', error.message)
      } else {
        console.log('Unknown error sending verification email.')
      }

      return { ok: false }
    }
  }
}
