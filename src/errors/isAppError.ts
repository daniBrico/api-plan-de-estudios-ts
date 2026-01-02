import { AppError } from './AppError'

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
