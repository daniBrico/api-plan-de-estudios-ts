import express from 'express'
import careerRoutes from './routes/career.routes'
import cors from 'cors'

const app = express()

const FRONTEND_URL = process.env.FRONTEND_URL

const corsOptions = {
  origin: FRONTEND_URL,
  methods: 'GET',
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/career', careerRoutes)
app.use('/ping', (_req, res) => {
  res.send('pong')
})

export { app }
