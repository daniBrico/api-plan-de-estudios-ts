import { BrevoClient } from '@getbrevo/brevo'
import { EMAIL_CONFIG } from './config'

const { SENDER_EMAIL, SENDER_NAME } = EMAIL_CONFIG

export const brevo = new BrevoClient({
  apiKey: EMAIL_CONFIG.BREVO_API_KEY,
})

interface sendEmailProps {
  email: string
  subject: string
  htmlContent: string
}

// interface sendEmailReturn {

// }

export const sendEmail = async ({
  subject,
  email,
  htmlContent,
}: sendEmailProps) => {
  try {
    const response = await brevo.transactionalEmails.sendTransacEmail({
      subject: subject,
      textContent: htmlContent,
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: email }],
    })

    return {
      ok: true,
      messageId: response.messageId,
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
