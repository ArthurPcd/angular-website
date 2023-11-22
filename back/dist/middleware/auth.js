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
exports.authenticateMiddleware = exports.generateAccessToken = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = require("jsonwebtoken");
function generateAccessToken(user) {
    return (0, jsonwebtoken_1.sign)({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}
exports.generateAccessToken = generateAccessToken;
function authenticateMiddleware(req, res, next) {
    const header = req.headers['authorization'];
    const token = header === null || header === void 0 ? void 0 : header.split(' ')[1];
    if (!(header === null || header === void 0 ? void 0 : header.startsWith('Bearer ')) || !token)
        return res.sendStatus(401);
    (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (hasError, payload) => __awaiter(this, void 0, void 0, function* () {
        const isUser = (jwt) => {
            return !!jwt;
        };
        if (hasError || !isUser(payload))
            return res.sendStatus(401);
        req.user = yield user_1.User.findOne({ _id: payload.user._id }).exec();
        next();
    }));
}
exports.authenticateMiddleware = authenticateMiddleware;
