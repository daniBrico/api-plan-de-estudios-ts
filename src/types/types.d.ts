import { Document, Schema } from 'mongoose'

export interface ISubjectsByYear {
  year: string
  subjects: Schema.Types.ObjectId[]
}

export interface ICareer extends Document {
  name: string
  duration: number
  intermediateDegree?: string
  intermediateDegreeDuration?: number
  subjectsByYear: ISubjectsByYear[]
}

interface ISubject extends Document {
  name: {
    longName: string
    shortName?: string
  }
  code: string
  offering?: string
  correlatives?: Schema.Types.ObjectId[]
}

export interface IUser extends Document {
  name: string
  lastName: string
  email: string
  password: string
  encryptPassword(password: string): Promise<string>
  matchPassword(password: string): Promise<boolean>
}

interface Correlatives {
  code: string
  correlatives: string[]
}

// getCareerById

export interface IPopulatedSubject {
  _id: Types.ObjectId
  name: {
    longName: string
    shortName: string
  }
  code: string
  offering?: string
  correlatives: { code: string }[]
}

export interface IPopulatedCareerYear {
  year: string
  subjects: IPopulatedSubject[]
}

export interface IPopulatedCareer extends Omit<ICareer, 'subjectsByYear'> {
  subjectsByYear: IPopulatedCareerYear[]
}
