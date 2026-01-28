import { z } from 'zod'

export const lastNameSchema = z
  .string()
  .trim()
  .min(2)
  .max(50)
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/)
