import fsPromises from 'fs/promises'
import {
  closeDatabaseConnection,
  openDatabaseConnection,
} from '../../models/mongoDB/database.js'
import SubjectModel from '../../models/mongoDB/schemas/subject.model.js'
import CareerModel from '../../models/mongoDB/schemas/career.model.js'

const main = async () => {
  try {
    await openDatabaseConnection()
    await setCareers()
  } catch (err) {
    console.log('Error al conectarse a MongoDB: ', err)
  } finally {
    closeDatabaseConnection()
  }
}

const setCareers = async () => {
  const careersData = JSON.parse(
    await fsPromises.readFile('../data/careers.json', 'utf-8')
  )

  try {
    // Obtengo todas las materias de la base de datos
    const subjects = await SubjectModel.find()

    // Recorro las carreras del archivo .json (por ahora solo hay una)
    for (const career of careersData) {
      let subjectsByYearToLoad = []

      for (const subjectsByYear of career.subjectsByYear) {
        let subjectsFindId = []

        for (const subject of subjectsByYear.subjects) {
          let subjectFind = subjects.find((obj) => obj.code === subject.code)

          if (subjectFind) subjectsFindId.push(subjectFind._id)
        }

        subjectsByYearToLoad.push({
          year: subjectsByYear.year,
          subjects: subjectsFindId,
        })
      }

      const newCareer = new CareerModel({
        name: career.name,
        duration: career.duration,
        intermediateDegree: career.intermediateDegree,
        intermediateDegreeDuration: career.intermediateDegreeDuration,
        subjectsByYear: subjectsByYearToLoad,
      })

      await newCareer.save()
    }
  } catch (err) {
    console.log('Error adding careers: ', err)
  }
}

main()
