import { Router } from 'express'
import {
  loginController,
  register,
  verifyEmail,
  verifyToken,
} from '../controllers/auth.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', loginController)

router.post('/verify/email', verifyEmail)
router.get('/verify/token', authMiddleware, verifyToken)

export default router
