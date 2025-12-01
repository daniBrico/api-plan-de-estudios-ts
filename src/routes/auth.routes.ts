import { Router } from 'express'
import {
  loginUser,
  register,
  verifyToken,
} from '../controllers/auth.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', register)
router.get('/login', loginUser)

router.get('/verify', authMiddleware, verifyToken)

export default router
