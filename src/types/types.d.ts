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
  name: string
  code: string
  offering?: string
  correlatives?: Schema.Types.ObjectId[]
}

interface Correlatives {
  code: string
  correlatives: string[]
}
