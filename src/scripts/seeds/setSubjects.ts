import {
  closeDatabaseConnection,
  openDatabaseConnection,
} from '../../models/mongoDB/database'
import SubjectModel from '../../models/mongoDB/schemas/subject.model'
import fsPromises from 'fs/promises'

openDatabaseConnection()
  .then(() => {
    seedDatabase()
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB: ', err)
  })

const seedDatabase = async () => {
  try {
    const subjectsData = JSON.parse(
      await fsPromises.readFile('../data/subjects.json', 'utf-8')
    )

    await SubjectModel.deleteMany({})

    SubjectModel.insertMany(subjectsData)
      .then((subjects) => {
        console.log('Materias agregadas correctamente: ', subjects)
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
