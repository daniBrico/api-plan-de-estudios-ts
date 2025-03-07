import express from 'express'
import careerRoutes from './routes/career.routes'

const app = express()

app.use(express.json())

app.use('/career', careerRoutes)
app.use('/ping', (_req, res) => {
  res.send('pong')
})

export { app }
