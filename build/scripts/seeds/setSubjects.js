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
const database_1 = require("../../models/mongoDB/database");
const subject_model_1 = __importDefault(require("../../models/mongoDB/schemas/subject.model"));
const promises_1 = __importDefault(require("fs/promises"));
(0, database_1.openDatabaseConnection)()
    .then(() => {
    seedDatabase();
})
    .catch((err) => {
    console.error('Error conectando a MongoDB: ', err);
});
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjectsData = JSON.parse(yield promises_1.default.readFile('../data/subjects.json', 'utf-8'));
        yield subject_model_1.default.deleteMany({});
        subject_model_1.default.insertMany(subjectsData)
            .then((subjects) => {
            console.log('Materias agregadas correctamente: ', subjects);
        })
            .catch((err) => {
            console.log('Error al insertar documentos: ', err);
        })
            .finally(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, database_1.closeDatabaseConnection)();
        }));
    }
    catch (err) {
        console.log(err);
    }
});
