export type AppError = Error & {
  statusCode: number
  errorCode: string
}

export const createAppError = (
  message: string,
  statusCode: number,
  errorCode: string,
): AppError => {
  const error = new Error(message) as AppError
  error.statusCode = statusCode
  error.errorCode = errorCode

  return error
}

export const isAppError = (error: unknown): error is AppError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'errorCode' in error &&
    typeof (error as any).statusCode === 'number' &&
    typeof (error as any).errorCode === 'string'
  )
}
