import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '../../../types/types'

const UserSchema = new Schema<IUser>(
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
  },
  {
    timestamps: true,
    toObject: {
      transform: (_, ret) => {
        delete ret.password
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
        return ret
      },
    },
    toJSON: {
      transform: (_, ret) => {
        delete ret.password
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
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
