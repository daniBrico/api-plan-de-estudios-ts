import { Request, Response, NextFunction } from 'express'
import { isAppError } from '../errors/AppError'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

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

  if (error instanceof TokenExpiredError) {
    res.status(401).json({
      success: false,
      message: 'Token expired',
      errorCode: 'TOKEN_EXPIRED',
    })

    return
  }

  if (error instanceof JsonWebTokenError) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      errorCode: 'TOKEN_INVALID',
    })

    return
  }

  console.error(error)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })

  return
}
