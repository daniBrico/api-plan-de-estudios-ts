import { Types } from 'mongoose'

export interface SubjectsByYear {
  year: string
  subjects: string[]
}

export interface Subject {
  name: {
    longName: string
    shortName?: string
  }
  code: string
  offering?: string
  correlatives?: Correlatives
}

interface Correlatives {
  code: string
  correlatives: string[]
}

/* Mongo Document */

export interface SubjectsByYearDocument {
  year: string
  subjects: Types.ObjectId[]
}

export interface SubjectDocument {
  name: {
    longName: string
    shortName?: string
  }
  code: string
  offering?: string
  correlatives?: CorrelativesDocument
}

interface CorrelativesDocument {
  code: string
  correlatives: Types.ObjectId[]
}

/* Populated */

export interface PopulatedSubject {
  _id: string
  name: {
    longName: string
    shortName: string
  }
  code: string
  offering?: string
  correlatives: { code: string }[]
}

export interface PopulatedSubjectDocument {
  _id: Types.ObjectId
  name: {
    longName: string
    shortName: string
  }
  code: string
  offering?: string
  correlatives: { code: string }[]
}

/* Public types */

export interface PublicSubject extends Subject {}
