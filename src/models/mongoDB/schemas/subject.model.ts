import { Schema, model } from 'mongoose'
import { Subject } from '../../../types/types'

const SubjectSchema = new Schema<Subject>({
  name: {
    longName: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
    },
  },
  code: {
    type: String,
    required: true,
  },
  offering: {
    type: String,
  },
  correlatives: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
})

const SubjectModel = model<Subject>('Subject', SubjectSchema)

export default SubjectModel
