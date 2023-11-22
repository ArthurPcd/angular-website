"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const mongodb_1 = require("./mongodb");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const profile_1 = require("./routes/profile");
const update_1 = require("./routes/update");
const schedule_1 = require("./routes/schedule");
const image_1 = require("./routes/image");
const authService_1 = require("./service/authService");
const APP = (0, express_1.default)();
APP.get('/api/ping', (_req, res) => {
    (0, authService_1.register)({ email: 'thomas.joan.pl@gmail.com', password: 'Tktmongars@69' });
    (0, authService_1.register)({ email: 'arthur.pacaud@epitech.eu', password: 'Tktmongars@69' });
    res.status(200)
        .send('Pong');
});
APP.get('/api/status', (_req, res) => {
    res.sendStatus((0, mongodb_1.isConnected)() ? 200 : 500);
});
APP.use((0, cors_1.default)());
APP.use((0, express_1.json)());
APP.use(auth_1.authRouter);
APP.use(profile_1.profileRouter);
APP.use(update_1.updateRouter);
APP.use(schedule_1.scheduleRouter);
APP.use(image_1.imageRouter);
exports.default = APP;
