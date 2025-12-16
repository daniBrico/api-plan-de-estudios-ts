import { Router } from 'express'
import {
  login,
  register,
  verifyEmail,
  verifyToken,
} from '../controllers/auth.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)

router.post('/verify/email', verifyEmail)
router.get('/verify/token', authMiddleware, verifyToken)

export default router
