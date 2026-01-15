import { Schema, model } from 'mongoose'
import { SubjectDocument } from '../../../types/domain/subject'

const subjectTransform = (_: unknown, ret: any) => {
  if (ret._id) {
    ret.id = ret._id.toString()
    delete ret._id
  }
  delete ret.__v
  return ret
}

const SubjectSchema = new Schema<SubjectDocument>(
  {
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
  },
  {
    toObject: {
      transform: subjectTransform,
    },
    toJSON: {
      transform: subjectTransform,
    },
  }
)

const SubjectModel = model<SubjectDocument>('Subject', SubjectSchema)

export default SubjectModel
