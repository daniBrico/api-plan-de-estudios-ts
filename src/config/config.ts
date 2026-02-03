import { StringValue } from 'ms'

const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`)
  }

  return value
}

export const ENV = {
  JWT_SECRET: required(process.env.JWT_SECRET, 'JWT_SECRET'),
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN ?? '15m') as StringValue,
  TOKEN_MAX_AGE: Number(process.env.TOKEN_MAX_AGE ?? 900000),
  PORT: Number(process.env.PORT ?? 3000),
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  NODE_ENV: process.env.NODE_END ?? 'development',
}

export const VERIFICATION_CONFIG = {
  MIN_RESEND_INTERVAL_MINUTES: Number(
    process.env.MIN_RESEND_INTERVAL_MINUTES ?? 10,
  ),
  MAX_EMAIL_ATTEMPTS_PER_DAY: Number(
    process.env.MAX_EMAIL_ATTEMPTS_PER_DAY ?? 2,
  ),
  TOKEN_EXPIRATION_HOURS: Number(process.env.TOKEN_EXPIRATION_HOURS ?? 24),
}

export const URLS = {
  FRONTEND_ORIGINS: process.env.FRONTEND_ORIGINS,
  FRONTEND: process.env.FRONTEND,
}

export const EMAIL_CONFIG = {
  BREVO_API_KEY: required(process.env.BREVO_API_KEY, 'BREVO_API_KEY'),
  SENDER_EMAIL: required(process.env.BREVO_SENDER_EMAIL, 'BREVO_SENDER_EMAIL'),
  SENDER_NAME: required(process.env.BREVO_SENDER_NAME, 'BREVO_SENDER_NAME'),
  RESEND_API_KEY: required(process.env.RESEND_API_KEY, 'RESEND_API_KEY'),
}
