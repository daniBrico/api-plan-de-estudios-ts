import { z } from 'zod'

export const nameSchema = z
  .string()
  .trim()
  .min(2)
  .max(25)
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/)
