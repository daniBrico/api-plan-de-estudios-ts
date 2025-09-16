import express from 'express'
import careerRoutes from './routes/career.routes'
import cors from 'cors'

const app = express()

const { FRONTEND_URL, FRONTEND_URL_GITHUB_PAGES } = process.env

const corsOptions = {
  origin: [`${FRONTEND_URL}`, `${FRONTEND_URL_GITHUB_PAGES}`],
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
