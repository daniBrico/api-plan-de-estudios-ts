import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from '@getbrevo/brevo'
import { ENV } from './config'

export const transactionalApi = new TransactionalEmailsApi()

transactionalApi.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  ENV.BREVO_API_KEY as string,
)

const smtpEmail = new SendSmtpEmail()

interface sendEmailProps {
  email: string
  subject: string
  htmlContent: string
}

export const sendEmail = async ({
  subject,
  email,
  htmlContent,
}: sendEmailProps) => {
  smtpEmail.subject = subject
  smtpEmail.to = [{ email: email }]
  smtpEmail.htmlContent = htmlContent
  smtpEmail.sender = { name: 'Daniel Jorge', email: 'stailokmix@gmail.com' }

  await transactionalApi.sendTransacEmail(smtpEmail)
}
