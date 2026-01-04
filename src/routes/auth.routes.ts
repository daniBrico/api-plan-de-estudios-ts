import { Router } from 'express'
import {
  loginController,
  registerController,
  verifyEmail,
  verifyToken,
} from '../controllers/auth.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', registerController)
router.post('/login', loginController)

router.post('/verify/email', verifyEmail)
router.get('/verify/token', authMiddleware, verifyToken)

export default router
