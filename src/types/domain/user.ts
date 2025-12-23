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

export interface UserDocument extends User, Document {
  password: string
  createdAt?: Date
  updatedAt?: Date
  encryptPassword(password: string): Promise<string>
  matchPassword(password: string): Promise<boolean>
}

export interface userCareer {}

/* Public types */

export interface PublicUser {
  name: string
  lastName: string
  email: string
  isVerified: boolean
}
