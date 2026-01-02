import { Request, Response } from 'express'
import UserModel from '../models/mongoDB/schemas/user.model'
import { createAccessToken } from '../utils/jwt'
import { VerificationService } from '../services/verification.service'
import { loginService } from '../services/auth.service'
import { verificationResponses } from '../constants/AuthResponses'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, lastName, email, password } = req.body

    const userFound = await UserModel.findOne({ email })

    if (userFound !== null) {
      res.status(409).json({
        errorCode: 'EMAIL_ALREADY_EXISTS',
        message: 'Email already in use',
      })
      return
    }

    const newUser = new UserModel({
      name,
      lastName,
      email,
    })

    newUser.password = await newUser.encryptPassword(password)

    await newUser.save()
    const result = await VerificationService.handleUnverifiedUser(newUser)

    if (result.status === 'SEND_FAILED') {
      res.status(201).json({
        message:
          'User created, but verification email could not be sent. Please request a new verification email.',
        code: 'VERIFICATION_EMAIL_SEND_FAILED',
        emailSent: false,
      })

      return
    }

    res.status(201).json({
      message: 'User created successfully. Please verify your email.',
      emailSent: true,
      code: 'EMAIL_SENT',
      email: newUser.email,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const authServiceResult = await loginService(email, password)

  if (authServiceResult.status === 'NOT_VERIFIED') {
    const response =
      verificationResponses[authServiceResult.verification?.status]

    res.status(response.statusCode).json(response)

    return
  }

  const { user } = authServiceResult

  const token = createAccessToken({
    id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
  })

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  res.status(200).json({
    message: 'Login was successful',
    user: {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    },
    code: 'LOGIN_SUCCESSFUL',
  })
}

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const _id = req.user?.id

    const userFounded = await UserModel.findById(_id)

    if (!userFounded) {
      res.status(401).json({ message: 'Authentication error' })
      return
    }

    res.status(200).json({
      message: 'Successful authentication',
      user: {
        _id: userFounded._id,
        name: userFounded.name,
        lastName: userFounded.lastName,
        email: userFounded.email,
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Internal server error' })
      return
    }

    res.status(500).json({ message: 'Unexpected error' })
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    const userFounded = await UserModel.findOne({ verificationToken: token })

    if (!userFounded) {
      res.status(500).json({
        message: 'Invalid token',
        success: false,
        errorCode: 'TOKEN_INVALID',
      })
      return
    }

    const verificationResult =
      VerificationService.checkVerificationStatus(userFounded)

    if (verificationResult.statusCode !== 'TOKEN_VALID') {
      switch (verificationResult.statusCode) {
        case 'TOKEN_INVALID': {
          res.status(500).json({
            message: 'Token verification timer not exist.',
            success: false,
            errorCode: 'TOKEN_INVALID',
          })

          break
        }

        case 'TOKEN_EXPIRED': {
          res.status(400).json({
            message: 'Verification link expired.',
            success: false,
            errorCode: 'TOKEN_EXPIRED',
          })

          break
        }
      }

      return
    }

    userFounded.isVerified = true
    userFounded.verificationToken = null
    userFounded.verificationTokenExpires = null
    userFounded.lastVerificationEmailSentAt = null
    userFounded.verificationEmailAttempts = 0

    await userFounded.save()

    res.status(200).json({
      message: 'Email verified successfully. Please log in',
      success: true,
    })
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: 'Unexpected error in verify email', success: false })
      console.log('Unexpected error in verify email: ', error.message)
    } else {
      res
        .status(500)
        .json({ message: 'Unknown error to verify email', success: false })
    }
  }
}
