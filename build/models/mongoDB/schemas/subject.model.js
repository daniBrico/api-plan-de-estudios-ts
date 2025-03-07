"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    offering: {
        type: String,
    },
    correlatives: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Subject',
        },
    ],
});
const SubjectModel = (0, mongoose_1.model)('Subject', SubjectSchema);
exports.default = SubjectModel;
