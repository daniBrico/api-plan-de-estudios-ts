import { createAppError } from './AppError'

export const AuthError = {
  invalidCredentials: () =>
    createAppError('Invalid credentials', 401, 'INVALID_CREDENTIALS'),

  emailIsNotVerified: () =>
    createAppError('Email not verified', 409, 'EMAIL_VERIFICATION_REQUIRED'),

  emailAlreadyExists: () =>
    createAppError('Email already in use', 409, 'EMAIL_ALREADY_EXISTS'),

  missingToken: () =>
    createAppError('Authentication token missing', 401, 'TOKEN_MISSING'),
}
