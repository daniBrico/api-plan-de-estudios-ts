import type { EmailProvider } from './email.provider'
import { BrevoEmailProvider } from './providers/brevo.provider'
import { ResendEmailProvider } from './providers/resend.provider'

export const createEmailProvider = (emailProvider: string): EmailProvider => {
  switch (emailProvider) {
    case 'resend':
      return new ResendEmailProvider()
    case 'brevo':
    default:
      return new BrevoEmailProvider()
  }
}
