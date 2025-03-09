import subjectsCorrelativesData from '../data/subjectsCorrelative.json'
import {
  closeDatabaseConnection,
  openDatabaseConnection,
} from '../../models/mongoDB/database.js'
import SubjectModel from '../../models/mongoDB/schemas/subject.model.js'

openDatabaseConnection()
  .then(() => {
    setSubjectsCorrelatives()
  })
  .catch((err) => {
    console.log('Error al conectarse a MongoDB: ', err)
  })

const setSubjectsCorrelatives = async () => {
  try {
    // Obtengo todas las materias cargadas en la base de datos
    const subjects = await SubjectModel.find().exec()

    // Recorro el arreglo de objetos subjectsCorrelatives
    await Promise.all(
      subjectsCorrelativesData.map(async (correlative) => {
        let idCorrelatives: string[] = []

        // Por cada materia, accedo a sus correlativas
        correlative.correlatives.forEach((correlative) => {
          // Por cada correlativa de mi archivo .json, la busco en el arreglo de materias que obtuve de la base de datos
          let subjectFind = subjects.find(
            (subject) => subject.code === correlative
          )
          // Si la encuentro, me guardo su ID en el arreglo idCorrelatives
          if (subjectFind) idCorrelatives.push(subjectFind._id as string)
        })

        await SubjectModel.findOneAndUpdate(
          { code: `${correlative.code}` },
          { $addToSet: { correlatives: { $each: idCorrelatives } } },
          { new: true }
        )
      })
    )

    await closeDatabaseConnection()
  } catch (err) {
    console.log('Error en setSubjectsCorrelatives: ', err)
  }
}
