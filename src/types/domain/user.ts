import type { HydratedDocument, Types } from 'mongoose'

export interface User {
  name: string
  lastName: string
  email: string
  isVerified: boolean
  verificationToken?: string | null
  verificationTokenExpires?: Date | null
  lastVerificationEmailSentAt?: Date | null
  verificationEmailAttempts: number
}

export type UserDocument = HydratedDocument<User> & {
  password: string
  encryptPassword(password: string): Promise<string>
  matchPassword(password: string): Promise<boolean>
}

/* User career */

export type SubjectState =
  | 'aprobada'
  | 'cursando'
  | 'regular'
  | 'recursar'
  | 'equivalencia'
  | null

export interface UserCareer {
  id: string
  user: string
  career: string
  subjectStates: {
    subject: string
    state: SubjectState
  }[]
}

export type UserCareerDocument = HydratedDocument<{
  user: Types.ObjectId
  career: Types.ObjectId
  subjectStates: {
    subject: Types.ObjectId
    state: SubjectState
  }[]
}>

/* Public types */

export interface PublicUser {
  name: string
  lastName: string
  email: string
  isVerified: boolean
}
