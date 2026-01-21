import rateLimit from 'express-rate-limit'

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
})

export const publicLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
})

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
})

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
})

export const verifyEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
})
