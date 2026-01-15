import { Schema, model } from 'mongoose'
import { CareerDocument } from '../../../types/domain/career'

const careerTransform = (_: unknown, ret: any) => {
  if (ret._id) {
    ret.id = ret._id.toString()
    delete ret._id
  }
  delete ret.__v
  delete ret.createdAt
  delete ret.updatedAt
  return ret
}

const CareerSchema = new Schema<CareerDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    intermediateDegree: {
      type: String,
    },
    intermediateDegreeDuration: {
      type: Number,
    },
    subjectsByYear: {
      type: [
        {
          _id: false,
          year: {
            type: String,
            required: true,
          },
          subjects: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Subject',
              required: true,
            },
          ],
        },
      ],
      required: true,
    },
  },
  {
    toObject: {
      transform: careerTransform,
    },
    toJSON: {
      transform: careerTransform,
    },
  }
)

const CareerModel = model<CareerDocument>('Career', CareerSchema)

export default CareerModel
