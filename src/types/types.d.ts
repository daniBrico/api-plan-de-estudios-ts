/* jwt */
export interface TokenPayload {
  id: string
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
