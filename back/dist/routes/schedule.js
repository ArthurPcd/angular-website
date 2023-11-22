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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const schedulesService_1 = require("../service/schedulesService");
const scheduleDay_1 = require("../models/scheduleDay");
const router = (0, express_1.Router)();
exports.scheduleRouter = router;
router.put('/api/schedules/update', auth_1.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data.day) {
            yield (0, schedulesService_1.updateScheduleDay)(data.day);
            res.sendStatus(200);
        }
        else {
            res.status(400).json({ message: `Missing schedule day in body` });
        }
    }
    catch (error) {
        console.error('Error updating user schedule day', error);
        res.sendStatus(500);
    }
}));
router.get('/api/schedules', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield scheduleDay_1.ScheduleDayModel.find({});
        res.json(schedules);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
