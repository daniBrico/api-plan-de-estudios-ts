import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types/types'

export const createAccessToken = (payload: TokenPayload) => {
  const { JWT_SECRET } = process.env

  if (!JWT_SECRET)
    throw new Error('Token is not defined in environment variables')

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}
