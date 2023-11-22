"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    data: {
        type: Buffer,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
});
const Image = (0, mongoose_1.model)('Image', schema);
exports.Image = Image;
