import express from 'express'
import careerRoutes from './routes/career.routes'
import authRoutes from './routes/auth.routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { FRONTEND_URLS } from './config/config'
import { errorHandler } from './middlewares/errorHandler.middleware'

const app = express()

const { LOCAL, LAN, GITHUB_PAGES } = FRONTEND_URLS

const corsOptions = {
  origin: [`${LOCAL}`, `${LAN}`, `${GITHUB_PAGES}`],
  methods: 'GET',
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

/* Auth routes */
app.use('/auth', authRoutes)

/* Career routes */
app.use('/career', careerRoutes)

app.use(errorHandler)

export { app }
