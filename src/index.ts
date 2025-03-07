import { createServer } from 'node:http'
import { app } from './app'
import { openDatabaseConnection } from './models/mongoDB/database'

// Tengo que configurar esta variable de entorno
const port = process.env.PORT ?? 3000

// Creación del servidor http
const server = createServer(app)

server.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`)
})

openDatabaseConnection()
