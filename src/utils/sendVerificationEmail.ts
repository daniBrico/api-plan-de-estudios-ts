import { Resend } from 'resend'

const { RESEND_API_KEY, FRONTEND_URL_LOCAL } = process.env

const resend = new Resend(RESEND_API_KEY)

interface SendVerificationEmailProps {
  email: string
  token: string
  name: string
}

const sendVerificationEmail = async ({
  email,
  token,
  name,
}: SendVerificationEmailProps) => {
  try {
    const verifyUrl = `${FRONTEND_URL_LOCAL}/auth/verify-email?token=${token}`

    const { data, error } = await resend.emails.send({
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

    if (!error) return { ok: false, error: error }

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

export default sendVerificationEmail
