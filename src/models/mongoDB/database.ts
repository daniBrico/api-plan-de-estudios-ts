import mongoose from 'mongoose'

export const openDatabaseConnection = async () => {
  const { MONGODB_HOST, DATABASE_NAME } = process.env

  if (!MONGODB_HOST || !DATABASE_NAME)
    throw new Error('Missing MongoDB configuration in environment variables')

  const MONGODB_URI = `${MONGODB_HOST}${DATABASE_NAME}`

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
