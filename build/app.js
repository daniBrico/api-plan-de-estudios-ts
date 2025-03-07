"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const career_routes_1 = __importDefault(require("./routes/career.routes"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use('/career', career_routes_1.default);
app.use('/ping', (_req, res) => {
    res.send('pong');
});
