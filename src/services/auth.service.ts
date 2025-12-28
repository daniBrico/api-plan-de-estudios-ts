import { AuthError } from '../errors/AuthError'
import UserModel from '../models/mongoDB/schemas/user.model'
import bcrypt from 'bcrypt'
import { VerificationResult, VerificationService } from './verification.service'
import { UserDocument } from '../types/domain/user'

type LoginServiceResult =
  | {
      status: 'OK'
      user: UserDocument
    }
  | {
      status: 'NOT_VERIFIED'
      verification: VerificationResult
    }

export const loginService = async (
  email: string,
  password: string
): Promise<LoginServiceResult> => {
  const user = await UserModel.findOne({ email })
  if (!user) throw AuthError.invalidCredentials()

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) throw AuthError.invalidCredentials()

  if (!user.isVerified) {
    const verificationResult = await VerificationService.handleUnverifiedUser(
      user
    )

    return { status: 'NOT_VERIFIED', verification: verificationResult }
  }

  return {
    status: 'OK',
    user,
  }
}
