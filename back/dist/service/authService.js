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
exports.hashPassword = exports.login = exports.register = exports.isString = void 0;
const userRepository_1 = require("../repository/userRepository");
const bcrypt_1 = require("bcrypt");
const auth_1 = require("../middleware/auth");
const EMAIL_REGEX = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const PASSWORD_CHARACTERS = '@?:-_~&=+/*%*^\\!.,;<>"\'()[]{}$';
const PASSWORD_LENGTH = 8;
const isString = (object) => {
    return typeof object === 'string';
};
exports.isString = isString;
function reject(reason) {
    if (isString(reason))
        return Promise.reject(new Error(reason));
    return Promise.reject(reason);
}
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield (0, bcrypt_1.genSalt)(10);
        return yield (0, bcrypt_1.hash)(password, salt);
    });
}
exports.hashPassword = hashPassword;
function userExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, userRepository_1.retrieveUser)(email)
            .then(() => {
            return true;
        }).catch(() => {
            return false;
        });
    });
}
function isValidCredentials(credentials) {
    const email = credentials.email.trim();
    const password = credentials.password.trim();
    const validEmail = EMAIL_REGEX.test(email);
    const validPasswordLength = password.length >= PASSWORD_LENGTH;
    const specialCharacters = password.split('')
        .filter(character => PASSWORD_CHARACTERS.includes(character));
    return (validEmail && validPasswordLength && specialCharacters.length > 0);
}
function register(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield userExists(credentials.email);
        if (exists)
            return reject('User with this email already exists');
        if (!isValidCredentials(credentials))
            return reject('Invalid credentials');
        return (0, userRepository_1.saveUser)({
            email: credentials.email,
            password: yield hashPassword(credentials.password),
            password_length: credentials.password.length
        });
    });
}
exports.register = register;
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, userRepository_1.retrieveUser)(credentials.email)
            .then((user) => __awaiter(this, void 0, void 0, function* () {
            const validCredentials = yield (0, bcrypt_1.compare)(credentials.password, user.password);
            if (!validCredentials)
                return reject('Invalid credentials');
            return (0, auth_1.generateAccessToken)(user);
        }))
            .catch(reason => {
            return reject(reason);
        });
    });
}
exports.login = login;
