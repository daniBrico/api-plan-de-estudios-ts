import 'dotenv/config'
import { createServer } from 'node:http'
import { app } from './app'
import { openDatabaseConnection } from './models/mongoDB/database'
import { ENV } from './config/config'

// Tengo que configurar esta variable de entorno
const port = ENV.PORT

// Creación del servidor http
const server = createServer(app)

server.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`)
})

openDatabaseConnection()
