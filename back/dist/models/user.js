"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    password_length: {
        type: Number,
        required: true,
    },
});
const User = (0, mongoose_1.model)('User', schema);
exports.User = User;
