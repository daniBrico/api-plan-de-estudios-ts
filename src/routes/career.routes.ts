import { Router } from 'express'
import {
  getCareerNames,
  getCareerByID,
} from '../controllers/career.controllers'

const router = Router()

router.get('/names', getCareerNames)

router.get('/:id', getCareerByID)

export default router
