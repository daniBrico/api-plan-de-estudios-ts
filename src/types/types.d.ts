import { Document, Schema } from 'mongoose'

export interface SubjectsByYear {
  year: string
  subjects: Schema.Types.ObjectId[]
}

export interface Career extends Document {
  name: string
  duration: number
  intermediateDegree?: string
  intermediateDegreeDuration?: number
  subjectsByYear: SubjectsByYear[]
}

interface Subject extends Document {
  name: {
    longName: string
    shortName?: string
  }
  code: string
  offering?: string
  correlatives?: Schema.Types.ObjectId[]
}

export interface User extends Document {
  name: string
  lastName: string
  email: string
  password: string
  isVerified: boolean
  verificationToken?: string | null
  verificationTokenExpires?: Date | null
  encryptPassword(password: string): Promise<string>
  matchPassword(password: string): Promise<boolean>
  createdAt?: Date
  updatedAt?: Date
}

interface Correlatives {
  code: string
  correlatives: string[]
}

// getCareerById

export interface PopulatedSubject {
  _id: Types.ObjectId
  name: {
    longName: string
    shortName: string
  }
  code: string
  offering?: string
  correlatives: { code: string }[]
}

export interface PopulatedCareerYear {
  year: string
  subjects: PopulatedSubject[]
}

export interface PopulatedCareer extends Omit<Career, 'subjectsByYear'> {
  subjectsByYear: PopulatedCareerYear[]
}

/* jwt */
export interface TokenPayload {
  _id: Types.ObjectId
  name: string
  lastName: string
  email: string
}

/* Express */

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}
