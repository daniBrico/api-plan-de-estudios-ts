import { Schema } from 'mongoose'

const UserCareerSchema = new Schema(
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
        status: {
          type: String,
          enum: ['pending', 'in_progress', 'approved', 'failed'],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)
