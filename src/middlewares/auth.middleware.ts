import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ message: 'Invalid token' })
    return
  }

  try {
    const decoded = verifyAccessToken(token)

    req.user = {
      _id: decoded._id,
      name: decoded.name,
      lastName: decoded.lastName,
      email: decoded.email,
    }

    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' })
    return
  }
}
