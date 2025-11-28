import { Request, Response } from 'express'
import UserModel from '../models/mongoDB/schemas/user.model'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, lastName, email, password } = req.body

  try {
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

    const savedUser = await newUser.save()

    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
