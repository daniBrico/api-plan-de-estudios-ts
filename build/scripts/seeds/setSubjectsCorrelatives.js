"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const database_js_1 = require("../../models/mongoDB/database.js");
const subject_model_js_1 = __importDefault(require("../../models/mongoDB/schemas/subject.model.js"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_js_1.openDatabaseConnection)();
        yield setSubjectsCorrelatives();
    }
    catch (err) {
        console.log('Error al conectarse a MongoDB: ', err);
    }
    finally {
        try {
            yield (0, database_js_1.closeDatabaseConnection)();
        }
        catch (err) {
            console.log('Error al cerrar la conexión: ', err);
        }
    }
});
const setSubjectsCorrelatives = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjectsCorrelativesData = JSON.parse(yield promises_1.default.readFile('../data/subjectsCorrelative.json', 'utf-8'));
        // Obtengo todas las materias cargadas en la base de datos
        const subjects = yield subject_model_js_1.default.find().exec();
        // Recorro el arreglo de objetos subjectsCorrelatives
        yield Promise.all(subjectsCorrelativesData.map((correlative) => __awaiter(void 0, void 0, void 0, function* () {
            let idCorrelatives = [];
            // Por cada materia, accedo a sus correlativas
            correlative.correlatives.forEach((correlative) => {
                // Por cada correlativa de mi archivo .json, la busco en el arreglo de materias que obtuve de la base de datos
                let subjectFind = subjects.find((subject) => subject.code === correlative);
                // Si la encuentro, me guardo su ID en el arreglo idCorrelatives
                if (subjectFind)
                    idCorrelatives.push(subjectFind._id);
            });
            yield subject_model_js_1.default.findOneAndUpdate({ code: `${correlative.code}` }, { $addToSet: { correlatives: { $each: idCorrelatives } } }, { new: true });
        })));
    }
    catch (err) {
        console.log('Error en setSubjectsCorrelatives: ', err);
    }
});
main();
