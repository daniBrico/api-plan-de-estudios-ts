export interface User {
  name: string
  lastName: string
  email: string
  isVerified: boolean
  verificationToken?: string | null
  verificationTokenExpires?: Date | null
  lastVerificationEmailSentAt?: Date | null
  verificationEmailAttempts: number
  createdAt?: Date
  updatedAt?: Date
}

export interface UserDocument extends User, Document {
  password: string
  encryptPassword(password: string): Promise<string>
  matchPassword(password: string): Promise<boolean>
}

export interface userCareer {}
