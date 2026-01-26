import express from 'express'
import careerRoutes from './routes/career.routes'
import authRoutes from './routes/auth.routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { URLS } from './config/config'
import { errorHandler } from './middlewares/errorHandler.middleware'

const app = express()

app.set('trust proxy', 1)

const { FRONTEND_ORIGINS } = URLS

const corsOptions = {
  origin: FRONTEND_ORIGINS?.split(','),
  methods: 'GET',
  credentials: true,
}

/* Global middlewares */
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

/* Routes */
app.use('/auth', authRoutes)
app.use('/career', careerRoutes)

app.use(errorHandler)

export { app }
