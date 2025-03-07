import CareerModel from '../models/mongoDB/schemas/career.model'
import { Request, Response } from 'express'

export const getCareerNames = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const careerNames = await CareerModel.find({}, 'name')

    if (careerNames.length === 0) {
      res.status(404).json({ message: 'No career names found' })
      return
    }

    res.json(careerNames)
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ message: error.message })
      : res.status(500).json({ message: 'An unknown error ocurred' })
  }
}
