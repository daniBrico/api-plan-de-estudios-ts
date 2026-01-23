import { AuthError } from '../errors/AuthError'
import UserModel from '../models/mongoDB/schemas/user.model'
import bcrypt from 'bcrypt'
import { VerificationResult, VerificationService } from './verification.service'
import { UserDocument } from '../types/domain/user'

type RegisterServiceResult =
  | {
      status: 'OK'
      user: UserDocument
      emailSent: true
    }
  | {
      status: 'EMAIL_SEND_FAILED'
      user: UserDocument
      emailSent: false
    }

export const registerService = async (
  name: string,
  lastName: string,
  email: string,
  password: string,
): Promise<RegisterServiceResult> => {
  const user = await UserModel.findOne({ email })

  if (user) throw AuthError.emailAlreadyExists()

  const newUser = new UserModel({
    name,
    lastName,
    email,
  })

  newUser.password = await newUser.encryptPassword(password)
  await newUser.save()

  const verificationResult =
    await VerificationService.handleUnverifiedUser(newUser)

  if (verificationResult.status === 'SEND_FAILED')
    return {
      status: 'EMAIL_SEND_FAILED',
      user: newUser,
      emailSent: false,
    }

  return {
    status: 'OK',
    user: newUser,
    emailSent: true,
  }
}

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
  password: string,
): Promise<LoginServiceResult> => {
  const user = await UserModel.findOne({ email })
  if (!user) throw AuthError.invalidCredentials()

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) throw AuthError.invalidCredentials()

  if (!user.isVerified) {
    const verificationResult =
      await VerificationService.handleUnverifiedUser(user)

    return { status: 'NOT_VERIFIED', verification: verificationResult }
  }

  return {
    status: 'OK',
    user,
  }
}
