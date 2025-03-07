"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CareerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    intermediateDegree: {
        type: String,
    },
    intermediateDegreeDuration: {
        type: Number,
    },
    subjectsByYear: {
        type: [
            {
                year: {
                    type: String,
                    required: true,
                },
                subjects: [
                    {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: 'Subject',
                        required: true,
                    },
                ],
            },
        ],
        required: true,
    },
});
const CareerModel = (0, mongoose_1.model)('Career', CareerSchema);
exports.default = CareerModel;
