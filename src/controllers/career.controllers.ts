import CareerModel from '../models/mongoDB/schemas/career.model'
import SubjectModel from '../models/mongoDB/schemas/subject.model'
import { Request, Response } from 'express'
import { PopulatedCareer } from '../types/domain/career'

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

export const getCareerByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id

    const career = await CareerModel.findById(id)
      .select('-__v')
      .populate({
        path: 'subjectsByYear.subjects',
        model: SubjectModel,
        select: '-_id -__v',
        populate: {
          path: 'correlatives',
          select: 'code -_id',
        },
      })
      .lean<PopulatedCareer>()

    if (!career) {
      res.status(404).json({ message: 'Career Not Found' })
      return
    }

    const populatedCareer = career

    const transformedCareer = {
      ...populatedCareer,
      subjectsByYear: populatedCareer.subjectsByYear.map((year) => ({
        year: year.year,
        subjects: year.subjects.map((subject) => ({
          ...subject,
          correlatives: subject.correlatives.map(
            (correlative) => correlative.code
          ),
        })),
      })),
    }

    res.json(transformedCareer)
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: 'An unknown error ocurred' })
  }
}
