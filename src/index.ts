import dotenv from 'dotenv'

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'

dotenv.config({ path: envFile })

import { createServer } from 'node:http'
import { app } from './app'
import { openDatabaseConnection } from './models/mongoDB/database'
import { ENV } from './config/config'

const bootstrap = async () => {
  try {
    await openDatabaseConnection()
    console.log('Database connected')

    const server = createServer(app)

    server.listen(ENV.PORT, () => {
      console.log(`Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`)
    })
  } catch (error) {
    console.error('Error starting server: ', error)
    process.exit(1)
  }
}

bootstrap()
