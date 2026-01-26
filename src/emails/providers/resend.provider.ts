import { Resend } from 'resend'
import { EmailProvider, SendEmailParams } from '../email.provider'
import { EMAIL_CONFIG } from '../../config/config'

export class ResendEmailProvider implements EmailProvider {
  private resend = new Resend(EMAIL_CONFIG.RESEND_API_KEY)

  async sendEmail({ to, subject, html }: SendEmailParams) {
    const { error, data } = await this.resend.emails.send({
      from: 'Soporte <no-reply@resend.dev>',
      to,
      subject,
      html,
    })

    if (error) {
      return { ok: false, error: error.message }
    }

    return { ok: true, messageId: data?.id }
  }
}
