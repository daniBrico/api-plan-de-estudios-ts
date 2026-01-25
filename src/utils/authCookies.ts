import { Response } from 'express'
import { ENV } from '../config/config'

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    sameSite: 'none',
    path: '/',
    maxAge: Number(ENV.TOKEN_MAX_AGE),
  })
}

export const clearAuthCookie = (res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: ENV.IS_PRODUCTION,
    sameSite: 'none',
    path: '/',
  })
}
