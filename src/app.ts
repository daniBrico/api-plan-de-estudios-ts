import express from 'express'
import careerRoutes from './routes/career.routes'
import cors from 'cors'

const app = express()

const {
  FRONTEND_URL_LOCAL,
  FRONTEND_URL_LAN,
  FRONTEND_URL_GITHUB_PAGES,
  FRONTEND_URL_RENDER,
} = process.env

const corsOptions = {
  origin: [
    `${FRONTEND_URL_LOCAL}`,
    `${FRONTEND_URL_LAN}`,
    `${FRONTEND_URL_GITHUB_PAGES}`,
    `${FRONTEND_URL_RENDER}`,
  ],
  methods: 'GET',
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/career', careerRoutes)

export { app }
