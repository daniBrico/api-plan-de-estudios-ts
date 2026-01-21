import { Router } from 'express'
import {
  getCareerNames,
  getCareerByID,
} from '../controllers/career.controllers'
import { publicLimiter } from '../middlewares/rateLimit.middleware'
import { validate } from '../middlewares/validate.middleware'
import { mongoIdSchema } from '../schemas/params/mongoId.schema'

const router = Router()

router.use(publicLimiter)

router.get('/names', getCareerNames)
router.get('/:id', validate(mongoIdSchema, 'params'), getCareerByID)

export default router
