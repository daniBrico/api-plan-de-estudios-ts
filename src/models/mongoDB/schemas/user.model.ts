import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { User } from '../../../types/types'

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpires: {
      type: Date,
      default: null,
    },
    lastVerificationEmailSentAt: {
      type: Date,
      default: null,
    },
    verificationEmailAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (_, ret: any) => {
        delete ret.password
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.verificationToken
        delete ret.verificationTokenExpires
        delete ret.lastVerificationEmailSentAt
        delete ret.verificationEmailAttempts
        return ret
      },
    },
    toJSON: {
      transform: (_, ret: any) => {
        delete ret.password
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.verificationToken
        delete ret.verificationTokenExpires
        delete ret.lastVerificationEmailSentAt
        delete ret.verificationEmailAttempts
        return ret
      },
    },
  }
)

UserSchema.methods.encryptPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export default model('User', UserSchema)
