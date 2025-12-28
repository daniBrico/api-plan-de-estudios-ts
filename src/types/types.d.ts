import { Document, Schema } from 'mongoose'

/* jwt */
export interface TokenPayload {
  id: Types.ObjectId
  name: string
  lastName: string
  email: string
}

/* Express */

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}
