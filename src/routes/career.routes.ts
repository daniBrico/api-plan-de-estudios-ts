import { Router } from 'express'
import {
  getCareerNames,
  getCareerByID,
} from '../controllers/career.controllers'
import { publicLimiter } from '../middlewares/rateLimit.middleware'

const router = Router()

router.use(publicLimiter)

router.get('/names', getCareerNames)
router.get('/:id', getCareerByID)

export default router
