import { Schema, model } from 'mongoose'
import { SubjectDocument } from '../../../types/domain/subject'

const SubjectSchema = new Schema<SubjectDocument>({
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

const SubjectModel = model<SubjectDocument>('Subject', SubjectSchema)

export default SubjectModel
