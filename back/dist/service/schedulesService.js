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
exports.updateScheduleDay = void 0;
const scheduleDay_1 = require("../models/scheduleDay");
function updateScheduleDay(day) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dayDb = yield scheduleDay_1.ScheduleDayModel.findOne({ "day": `${day.day}` }).exec();
            dayDb.openMorning = day.morning.open;
            dayDb.closeMorning = day.morning.close;
            dayDb.openAfternoon = day.afternoon.open;
            dayDb.closeAfternoon = day.afternoon.close;
            dayDb.closed = day.closed;
            yield dayDb.save();
        }
        catch (error) {
            console.error('Unable to update day schedule', error);
        }
    });
}
exports.updateScheduleDay = updateScheduleDay;
