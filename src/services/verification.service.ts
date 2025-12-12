import { randomUUID } from 'node:crypto'
import { User } from '../types/types'
import { Temporal } from '@js-temporal/polyfill'
import { Resend } from 'resend'

interface SendVerificationEmailProps {
  email: string
  token: string
  name: string
}

const { RESEND_API_KEY, FRONTEND_URL_LOCAL } = process.env

const resend = new Resend(RESEND_API_KEY)

export class VerificationService {
  static async handleUnverifiedUser(user: User) {
    const verificationStatus = await this.checkVerificationStatus(user)

    const shouldGenerateToken =
      verificationStatus.action === 'generateNewToken' ||
      verificationStatus.action === 'expiredToken'

    let { verificationToken, verificationTokenExpires } = user

    if (shouldGenerateToken || !verificationToken) {
      const generated = this.generateTokenEmail()
      verificationToken = generated.verificationToken
      verificationTokenExpires = generated.verificationTokenExpires

      user.verificationToken = verificationToken
      user.verificationTokenExpires = verificationTokenExpires
      await user.save()
    }

    const emailResult = await this.sendVerificationEmail({
      email: user.email,
      token: verificationToken,
      name: user.name,
    })

    return {
      emailSent: emailResult.ok,
      emailError: emailResult.error,
    }
  }

  static async checkVerificationStatus(user: User) {
    if (!user.verificationToken || !user.verificationTokenExpires)
      return { verified: false, action: 'generateNewToken' }

    if (user.verificationTokenExpires < new Date())
      return { verified: false, action: 'expiredToken' }

    return { verified: true, action: 'resendEmail' }
  }

  private static generateTokenEmail = () => {
    const verificationToken = randomUUID()
    const verificationTokenExpires = new Date(
      Temporal.Now.instant().add({ hours: 24 }).epochMilliseconds
    )

    return { verificationToken, verificationTokenExpires }
  }

  private static sendVerificationEmail = async ({
    email,
    token,
    name,
  }: SendVerificationEmailProps) => {
    try {
      const verifyUrl = `${FRONTEND_URL_LOCAL}/auth/verify-email?token=${token}`

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
