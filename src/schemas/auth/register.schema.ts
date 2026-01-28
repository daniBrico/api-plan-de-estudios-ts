import { z } from 'zod'
import { emailSchema } from '../fields/email.schema'
import { lastNameSchema } from '../fields/lastName.schema'
import { nameSchema } from '../fields/name.schema'
import { passwordSchema } from '../fields/password.schema'

export const registerSchema = z.object({
  name: nameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
})
