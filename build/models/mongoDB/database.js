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
exports.closeDatabaseConnection = exports.openDatabaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const openDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    // No queremos que este tipeada en código. Tenemos que usar variables de entorno.
    const { PDE_MONGODB_HOST, PDE_MONGODB_DATABASE } = process.env;
    // const PDE_MONGODB_HOST = 'localhost'
    // const PDE_MONGODB_DATABASE = 'plan-de-estudios'
    if (!PDE_MONGODB_HOST || !PDE_MONGODB_DATABASE)
        throw new Error('Missing MongoDB configuration in environment variables');
    const MONGODB_URI = `mongodb://${PDE_MONGODB_HOST}/${PDE_MONGODB_DATABASE}`;
    try {
        yield mongoose_1.default.connect(MONGODB_URI);
        console.log('DB is connected');
    }
    catch (err) {
        console.log('Error connecting to the database: ', err);
    }
});
exports.openDatabaseConnection = openDatabaseConnection;
const closeDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connection.close();
        console.log('DB connection closed');
    }
    catch (err) {
        console.log('Error closing the database: ', err);
    }
});
exports.closeDatabaseConnection = closeDatabaseConnection;
