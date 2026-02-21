import { sendEmail } from '../../config/brevo.config'
import type { EmailProvider, SendEmailParams } from '../email.provider'

export class BrevoEmailProvider implements EmailProvider {
  async sendEmail({ to, subject, html }: SendEmailParams) {
    const result = await sendEmail({
      email: to,
      subject,
      htmlContent: html,
    })

    if (!result.ok) {
      return {
        ok: false,
        error: result.message,
      }
    }

    return {
      ok: true,
      messageId: result.messageId,
    }
  }
}
