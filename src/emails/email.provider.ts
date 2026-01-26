export interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export interface EmailProvider {
  sendEmail(params: SendEmailParams): Promise<{
    ok: boolean
    messageId?: string
    error?: string
  }>
}
