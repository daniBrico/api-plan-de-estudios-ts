import mongoose from 'mongoose'

export const openDatabaseConnection = async () => {
  // No queremos que este tipeada en código. Tenemos que usar variables de entorno.
  const { PDE_MONGODB_HOST, PDE_MONGODB_DATABASE } = process.env
  // const PDE_MONGODB_HOST = 'localhost'
  // const PDE_MONGODB_DATABASE = 'plan-de-estudios'

  if (!PDE_MONGODB_HOST || !PDE_MONGODB_DATABASE)
    throw new Error('Missing MongoDB configuration in environment variables')

  const MONGODB_URI = `mongodb://${PDE_MONGODB_HOST}/${PDE_MONGODB_DATABASE}`

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('DB is connected')
  } catch (err) {
    console.log('Error connecting to the database: ', err)
  }
}

export const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close()
    console.log('DB connection closed')
  } catch (err) {
    console.log('Error closing the database: ', err)
  }
}
