import UserModel from '../../models/mongoDB/schemas/user.model'
import { loginService } from '../../services/auth.service'
import bcrypt from 'bcrypt'
import { VerificationService } from '../../services/verification.service'

jest.mock('../../models/mongoDB/schemas/user.model', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}))

jest.mock('bcrypt')

jest.mock('../../services/verification.service', () => ({
  VerificationService: {
    handleUnverifiedUser: jest.fn(),
  },
}))

describe('loginService', () => {
  it('throws error if user does not exist', async () => {
    ;(UserModel.findOne as jest.Mock).mockResolvedValue(null)

    await expect(loginService('test@mail.com', '123456')).rejects.toThrow(
      'Invalid credentials',
    )
  })

  it('returns NOT_VERIFIED when user is not verified', async () => {
    const mockUser = {
      password: 'hashed',
      isVerified: false,
    }

    ;(UserModel.findOne as jest.Mock).mockResolvedValue(mockUser)
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
    ;(VerificationService.handleUnverifiedUser as jest.Mock).mockResolvedValue({
      status: 'EMAIL_SENT',
    })

    const result = await loginService('test@email.com', '123456')

    expect(result.status).toBe('NOT_VERIFIED')
    expect(VerificationService.handleUnverifiedUser).toHaveBeenCalledWith(
      mockUser,
    )
  })

  it('returns OK when the user is registered and verified', async () => {
    const mockUser = {
      password: 'hashed',
      isVerified: true,
    }

    ;(UserModel.findOne as jest.Mock).mockResolvedValue(mockUser)
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

    const result = await loginService('test@email.com', '123456')

    expect(result.status).toBe('OK')
  })
})
