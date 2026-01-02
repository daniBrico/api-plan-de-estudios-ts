export const verificationResponses = {
  EMAIL_SENT: {
    statusCode: 409,
    message: 'Email not verified. We sent you a verification email.',
    errorCode: 'EMAIL_VERIFICATION_REQUIRED',
    emailSent: true,
  },
  TOO_SOON: {
    statusCode: 429,
    message:
      'A verification email was sent recently. Please wait a few minutes.',
    errorCode: 'VERIFICATION_EMAIL_TOO_SOON',
    emailSent: false,
  },
  MAX_ATTEMPTS_REACHED: {
    statusCode: 429,
    message:
      'You have reached the maximum number of verification email attempts today.',
    errorCode: 'VERIFICATION_EMAIL_LIMITE_REACHED',
    emailSent: false,
  },
  SEND_FAILED: {
    statusCode: 503,
    message:
      'We could not send the verification email. Please try again later.',
    errorCode: 'VERIFICATION_EMAIL_SEND_FAILED',
    emailSent: false,
  },
}
