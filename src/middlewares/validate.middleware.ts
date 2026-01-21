import { ZodType } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const validate =
  <T>(schema: ZodType, property: 'body' | 'params' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property])

    if (!result.success) {
      res.status(400).json({
        message: 'Validation error',
        errors: result.error.issues,
      })

      return
    }

    req[property] = result.data as T
    next()
  }
