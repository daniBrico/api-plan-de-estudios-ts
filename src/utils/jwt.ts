import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types/types'
import { ENV } from '../config/config'

const { JWT_SECRET, JWT_EXPIRES_IN } = ENV

if (!JWT_SECRET)
  throw new Error('Token is not defined in environment variables')

export const createAccessToken = (payload: TokenPayload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, JWT_SECRET) as TokenPayload
