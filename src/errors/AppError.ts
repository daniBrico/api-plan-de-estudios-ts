export type AppError = Error & {
  statusCode: number
  errorCode: string
}

export const createAppError = (
  message: string,
  statusCode: number,
  errorCode: string
): AppError => {
  const error = new Error(message) as AppError
  error.statusCode = statusCode
  error.errorCode = errorCode

  return error
}
