"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleDayModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    day: {
        type: String,
        required: true,
    },
    openMorning: {
        type: String,
        required: true,
    },
    closeMorning: {
        type: String,
        required: true,
    },
    openAfternoon: {
        type: String,
        required: true,
    },
    closeAfternoon: {
        type: String,
        required: true,
    },
    closed: {
        type: Boolean,
        required: true,
    },
});
const ScheduleDayModel = (0, mongoose_1.model)('ScheduleDayModel', schema);
exports.ScheduleDayModel = ScheduleDayModel;
