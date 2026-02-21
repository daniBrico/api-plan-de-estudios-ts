import { model, Schema } from 'mongoose'
import type { UserCareerDocument } from '../../../types/domain/user'

const userCareerTransform = (_: unknown, ret: any) => {
  if (ret._id) {
    ret.id = ret._id.toString()
    delete ret._id
  }
  delete ret.__v
  delete ret.createdAt
  delete ret.updatedAt
  return ret
}

const UserCareerSchema = new Schema<UserCareerDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    career: {
      type: Schema.Types.ObjectId,
      ref: 'Career',
      required: true,
    },
    subjectStates: [
      {
        subject: {
          type: Schema.Types.ObjectId,
          ref: 'Subject',
          required: true,
        },
        state: {
          type: String,
          enum: [
            'aprobada',
            'cursando',
            'regular',
            'recursar',
            'equivalencia',
            null,
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: userCareerTransform,
    },
    toJSON: {
      transform: userCareerTransform,
    },
  },
)

const UserCareerModel = model<UserCareerDocument>(
  'UserCareer',
  UserCareerSchema,
)

export default UserCareerModel
