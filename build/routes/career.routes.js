"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const career_controllers_1 = require("../controllers/career.controllers");
const router = (0, express_1.Router)();
router.get('/names', career_controllers_1.getCareerNames);
exports.default = router;
