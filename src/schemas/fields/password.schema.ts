import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8)
  .max(24)
  .regex(/[a-z]/)
  .regex(/[A-Z]/)
  .regex(/[0-9]/)
  .refine((val) => !val.includes(' '))
