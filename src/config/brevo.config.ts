import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from '@getbrevo/brevo'
import { EMAIL_CONFIG, ENV } from './config'

const { SENDER_EMAIL, SENDER_NAME } = EMAIL_CONFIG

export const transactionalApi = new TransactionalEmailsApi()

transactionalApi.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  ENV.BREVO_API_KEY as string,
)

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
  try {
    const smtpEmail = new SendSmtpEmail()

    smtpEmail.subject = subject
    smtpEmail.to = [{ email: email }]
    smtpEmail.htmlContent = htmlContent
    smtpEmail.sender = {
      name: SENDER_NAME,
      email: SENDER_EMAIL,
    }

    const response = await transactionalApi.sendTransacEmail(smtpEmail)

    return {
      ok: true,
      messageId: response.body?.messageId ?? null,
    }
  } catch (error: any) {
    return {
      ok: false,
      statusCode: error?.status,
      message:
        error?.response?.body?.message ||
        error?.message ||
        'Error desconocido enviando email',
    }
  }
}
