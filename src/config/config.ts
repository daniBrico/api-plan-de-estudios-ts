export const ENV = {
  JWT_SECRET: process.env.JWT_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
}

export const VERIFICATION_CONFIG = {
  MIN_RESEND_INTERVAL_MINUTES: Number(
    process.env.MIN_RESEND_INTERVAL_MINUTES ?? 10
  ),
  MAX_EMAIL_ATTEMPTS_PER_DAY: Number(
    process.env.MAX_EMAIL_ATTEMPTS_PER_DAY ?? 2
  ),
  TOKEN_EXPIRATION_HOURS: Number(process.env.TOKEN_EXPIRATION_HOURS ?? 24),
}
