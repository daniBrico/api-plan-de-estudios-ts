import express from 'express'
import careerRoutes from './routes/career.routes'
import cors from 'cors'

const app = express()

const { FRONTEND_URL_LOCALHOST, FRONTEND_URL_GITHUB_PAGES, FRONTEND_URL_IP } =
  process.env

const corsOptions = {
  origin: [
    `${FRONTEND_URL_LOCALHOST}`,
    `${FRONTEND_URL_GITHUB_PAGES}`,
    `${FRONTEND_URL_IP}`,
  ],
  methods: 'GET',
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/career', careerRoutes)

export { app }
