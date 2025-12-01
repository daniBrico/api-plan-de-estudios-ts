import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types/types'

const { JWT_SECRET } = process.env

if (!JWT_SECRET)
  throw new Error('Token is not defined in environment variables')

export const createAccessToken = (payload: TokenPayload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, JWT_SECRET) as TokenPayload
