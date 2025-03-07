import { Schema, model } from 'mongoose'
import { ISubject } from '../../../types/types'

const SubjectSchema = new Schema<ISubject>({
  name: {
    type: String,
    required: true,
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

const SubjectModel = model<ISubject>('Subject', SubjectSchema)

export default SubjectModel
