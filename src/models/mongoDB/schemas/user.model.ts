import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { type UserDocument } from '../../../types/domain/user'

const userTransform = (_: unknown, ret: any) => {
  if (ret._id) {
    ret.id = ret._id.toString()
    delete ret._id
  }
  delete ret.password
  delete ret.__v
  delete ret.createdAt
  delete ret.updatedAt
  delete ret.verificationToken
  delete ret.verificationTokenExpires
  delete ret.lastVerificationEmailSentAt
  delete ret.verificationEmailAttempts
  return ret
}

const UserSchema = new Schema<UserDocument>(
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
      transform: userTransform,
    },
    toJSON: {
      transform: userTransform,
    },
  },
)

UserSchema.methods.encryptPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

const UserModel = model<UserDocument>('User', UserSchema)

export default UserModel
