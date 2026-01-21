import { Router } from 'express'
import {
  loginController,
  registerController,
  verifyEmail,
  verifyToken,
} from '../controllers/auth.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { registerSchema } from '../schemas/auth/register.schema'
import { loginSchema } from '../schemas/auth/login.schema'
import { verifyEmailSchema } from '../schemas/auth/verifyEmail.schema'

const router = Router()

router.post('/register', validate(registerSchema), registerController)
router.post('/login', validate(loginSchema), loginController)

router.post('/verify/email', validate(verifyEmailSchema), verifyEmail)
router.get('/verify/token', authMiddleware, verifyToken)

export default router
