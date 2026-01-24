import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  verifyEmail,
  verifyToken,
} from '../controllers/auth.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { registerSchema } from '../schemas/auth/register.schema'
import { loginSchema } from '../schemas/auth/login.schema'
import { verifyEmailSchema } from '../schemas/auth/verifyEmail.schema'
import {
  loginLimiter,
  registerLimiter,
  verifyEmailLimiter,
} from '../middlewares/rateLimit.middleware'

const router = Router()

router.post(
  '/register',
  registerLimiter,
  validate(registerSchema),
  registerController,
)
router.post('/login', loginLimiter, validate(loginSchema), loginController)

router.post(
  '/verify/email',
  verifyEmailLimiter,
  validate(verifyEmailSchema),
  verifyEmail,
)
router.get('/verify/token', authMiddleware, verifyToken)

router.post('/logout', authMiddleware, logoutController)

export default router
