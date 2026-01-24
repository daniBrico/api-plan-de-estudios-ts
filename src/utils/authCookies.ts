import { Response } from 'express'
import { ENV } from '../config/config'

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    sameSite: 'lax',
    path: '/',
    maxAge: Number(ENV.TOKEN_MAX_AGE),
  })
}
