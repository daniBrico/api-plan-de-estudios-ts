import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'
import { AuthError } from '../errors/AuthError'

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token

    if (!token) throw AuthError.missingToken()

    const decoded = verifyAccessToken(token)

    req.user = {
      id: decoded.id,
      name: decoded.name,
      lastName: decoded.lastName,
      email: decoded.email,
    }

    next()
  } catch (error) {
    next(error)
  }
}
