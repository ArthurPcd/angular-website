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
exports.saveUser = exports.retrieveUser = void 0;
const user_1 = require("../models/user");
function retrieveUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const find = yield user_1.User.findOne({ email: email }).exec();
        if (find === null)
            return Promise.reject(new Error('Unable to find user with this email'));
        return find;
    });
}
exports.retrieveUser = retrieveUser;
function saveUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const saved = yield new user_1.User(user).save();
        return saved;
    });
}
exports.saveUser = saveUser;
