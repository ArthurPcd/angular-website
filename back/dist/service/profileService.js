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
exports.updateUserPassword = exports.updateUserEmail = void 0;
const user_1 = require("../models/user");
const authService_1 = require("./authService");
function updateUserEmail(userId, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findById(userId).exec();
            user.email = email;
            yield user.save();
        }
        catch (error) {
            console.error('Unable to update user email', error);
        }
    });
}
exports.updateUserEmail = updateUserEmail;
function updateUserPassword(userId, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findById(userId).exec();
            user.password = yield (0, authService_1.hashPassword)(password);
            user.password_length = password.length;
            yield user.save();
        }
        catch (error) {
            console.error('Unable to update user email', error);
        }
    });
}
exports.updateUserPassword = updateUserPassword;
