import { StringValue } from 'ms'

export const ENV = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as StringValue,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  PORT: process.env.PORT ?? 3000,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
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

export const FRONTEND_URLS = {
  LOCAL: process.env.FRONTEND_URL_LOCAL,
  LAN: process.env.FRONTEND_URL_LAN,
  GITHUB_PAGES: process.env.FRONTEND_URL_GITHUB_PAGES,
}

export const EMAIL_CONFIG = {
  SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
  SENDER_NAME: process.env.BREVO_SENDER_NAME,
}
