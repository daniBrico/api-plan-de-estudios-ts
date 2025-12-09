import { Router } from 'express'
import {
  loginUser,
  register,
  verifyEmail,
  verifyToken,
} from '../controllers/auth.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', loginUser)
router.post('/verify-email', verifyEmail)

router.get('/verify', authMiddleware, verifyToken)

export default router
