import { Request, Response, NextFunction } from 'express'
import { isAppError } from '../errors/AppError'

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (isAppError(error)) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errorCode: error.errorCode,
    })

    return
  }

  console.error(error)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}
