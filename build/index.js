'use strict'
var _a
Object.defineProperty(exports, '__esModule', { value: true })
const node_http_1 = require('node:http')
const app_1 = require('./app')
const database_1 = require('./models/mongoDB/database')
// Tengo que configurar esta variable de entorno
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000
// Creación del servidor http
const server = (0, node_http_1.createServer)(app_1.app)
server.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`)
})
;(0, database_1.openDatabaseConnection)()
