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
const career_model_js_1 = __importDefault(require("../../models/mongoDB/schemas/career.model.js"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_js_1.openDatabaseConnection)();
        yield setCareers();
    }
    catch (err) {
        console.log('Error al conectarse a MongoDB: ', err);
    }
    finally {
        (0, database_js_1.closeDatabaseConnection)();
    }
});
const setCareers = () => __awaiter(void 0, void 0, void 0, function* () {
    const careersData = JSON.parse(yield promises_1.default.readFile('../data/careers.json', 'utf-8'));
    try {
        // Obtengo todas las materias de la base de datos
        const subjects = yield subject_model_js_1.default.find();
        // Recorro las carreras del archivo .json (por ahora solo hay una)
        for (const career of careersData) {
            let subjectsByYearToLoad = [];
            for (const subjectsByYear of career.subjectsByYear) {
                let subjectsFindId = [];
                for (const subject of subjectsByYear.subjects) {
                    let subjectFind = subjects.find((obj) => obj.code === subject.code);
                    if (subjectFind)
                        subjectsFindId.push(subjectFind._id);
                }
                subjectsByYearToLoad.push({
                    year: subjectsByYear.year,
                    subjects: subjectsFindId,
                });
            }
            const newCareer = new career_model_js_1.default({
                name: career.name,
                duration: career.duration,
                intermediateDegree: career.intermediateDegree,
                intermediateDegreeDuration: career.intermediateDegreeDuration,
                subjectsByYear: subjectsByYearToLoad,
            });
            yield newCareer.save();
        }
    }
    catch (err) {
        console.log('Error adding careers: ', err);
    }
});
main();
