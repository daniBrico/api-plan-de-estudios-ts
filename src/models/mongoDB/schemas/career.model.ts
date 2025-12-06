import { Schema, model } from 'mongoose'
import { type Career } from '../../../types/types'

const CareerSchema = new Schema<Career>({
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

const CareerModel = model<Career>('Career', CareerSchema)

export default CareerModel
