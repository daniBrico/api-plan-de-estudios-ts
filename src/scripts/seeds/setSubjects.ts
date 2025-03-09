import subjectsData from '../data/subjects.json'
import {
  closeDatabaseConnection,
  openDatabaseConnection,
} from '../../models/mongoDB/database'
import SubjectModel from '../../models/mongoDB/schemas/subject.model'

openDatabaseConnection()
  .then(() => {
    seedDatabase()
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB: ', err)
  })

const seedDatabase = async () => {
  try {
    await SubjectModel.deleteMany({})

    SubjectModel.insertMany(subjectsData)
      .then(() => {
        console.log('Materias agregadas correctamente.')
      })
      .catch((err) => {
        console.log('Error al insertar documentos: ', err)
      })
      .finally(async () => {
        await closeDatabaseConnection()
      })
  } catch (err) {
    console.log(err)
  }
}
