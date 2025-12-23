import { Schema, model } from 'mongoose'
import { CareerDocument } from '../../../types/domain/career'

const CareerSchema = new Schema<CareerDocument>({
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
})

const CareerModel = model<CareerDocument>('Career', CareerSchema)

export default CareerModel
