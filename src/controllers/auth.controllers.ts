import { Request, Response } from 'express'
import UserModel from '../models/mongoDB/schemas/user.model'
import { createAccessToken } from '../utils/jwt'
import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'
import { Temporal } from '@js-temporal/polyfill'
import sendVerificationEmail from '../utils/sendVerificationEmail'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, lastName, email, password } = req.body

    const userFound = await UserModel.findOne({ email })

    if (userFound !== null) {
      res.status(409).json({ message: 'Email already in use' })
      return
    }

    const newUser = new UserModel({
      name,
      lastName,
      email,
    })

    newUser.password = await newUser.encryptPassword(password)

    const verificationToken = randomUUID()

    const verificationTokenExpires = new Date(
      Temporal.Now.instant().add({ hours: 24 }).epochMilliseconds
    )

    newUser.verificationToken = verificationToken
    newUser.verificationTokenExpires = verificationTokenExpires

    const savedUser = await newUser.save()

    const verificationEmailResult = await sendVerificationEmail({
      email,
      token: verificationToken,
      name,
    })

    if (!verificationEmailResult.ok) {
      console.log(
        'Error from verification email: ',
        verificationEmailResult.error
      )
      res.status(201).json({
        message:
          'User created, but verification email could not be sent. Please request a new verification email.',
        emailSent: false,
        user: savedUser,
      })
    }

    res.status(201).json({
      message: 'User created successfully. Please verify your email.',
      emailSent: true,
      user: savedUser,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    const userFounded = await UserModel.findOne({ email })
    if (!userFounded) {
      res.status(401).json({ message: 'User not found' })
      return
    }

    const passMatch = await bcrypt.compare(password, userFounded.password)
    if (!passMatch) {
      res.status(401).json({ message: 'Invalid password' })
      return
    }

    const user = {
      _id: userFounded._id,
      name: userFounded.name,
      lastName: userFounded.lastName,
      email: userFounded.email,
    }

    const token = await createAccessToken(user)
    res.cookie('token', token)

    res.status(200).json({
      message: 'Login was successful',
      user: user,
    })
  } catch (err) {
    res.status(500).json({
      message:
        err instanceof Error
          ? `Error in login user: ${err.message}`
          : 'Unknown error',
    })
  }
}

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const _id = req.user?._id

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
    const { token } = req.query

    const userFounded = await UserModel.findOne({ verificationToken: token })

    if (!userFounded) {
      res.status(500).json({ message: 'Invalid token' })
      return
    }

    if (!userFounded.verificationTokenExpires) {
      res.status(500).json({ message: 'Token verification timer not exist.' })
      return
    }

    if (userFounded.verificationTokenExpires < new Date()) {
      res.status(400).json({
        message: 'Verification link expired.',
      })
      return
    }

    userFounded.isVerified = true
    userFounded.verificationToken = null
    userFounded.verificationTokenExpires = null

    await userFounded.save()

    res
      .status(200)
      .json({ message: 'Email verified successfully. Please log in' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Unexpected error in verify email' })
      console.log('Unexpected error in verify email: ', error.message)
    } else {
      res.status(500).json({ message: 'Unknown error to verify email' })
    }
  }
}
