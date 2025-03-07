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
exports.getCareerNames = void 0;
const career_model_1 = __importDefault(require("../models/mongoDB/schemas/career.model"));
const getCareerNames = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const careerNames = yield career_model_1.default.find({}, 'name');
        if (careerNames.length === 0) {
            res.status(404).json({ message: 'No career names found' });
            return;
        }
        res.json(careerNames);
    }
    catch (error) {
        error instanceof Error
            ? res.status(500).json({ message: error.message })
            : res.status(500).json({ message: 'An unknown error ocurred' });
    }
});
exports.getCareerNames = getCareerNames;
