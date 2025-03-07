import { Router } from 'express'
import { getCareerNames } from '../controllers/career.controllers'

const router = Router()

router.get('/names', getCareerNames)

export default router
