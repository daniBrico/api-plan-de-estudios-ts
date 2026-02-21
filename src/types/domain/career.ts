import type {
  PopulatedSubject,
  SubjectsByYear,
  SubjectsByYearDocument,
} from './subject'

export interface Career {
  name: string
  duration: number
  intermediateDegree?: string
  intermediateDegreeDuration?: number
  subjectsByYear: SubjectsByYear[]
}

export interface CareerDocument {
  name: string
  duration: number
  intermediateDegree?: string
  intermediateDegreeDuration?: number
  subjectsByYear: SubjectsByYearDocument[]
}

/* Populated */

export interface PopulatedCareerYear {
  year: string
  subjects: PopulatedSubject[]
}

export interface PopulatedCareer {
  name: string
  duration: number
  intermediateDegree?: string
  intermediateDegreeDuration?: number
  subjectsByYear: {
    year: string
    subjects: PopulatedSubject[]
  }[]
}
