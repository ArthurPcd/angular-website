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
exports.authRouter = void 0;
const express_1 = require("express");
const authService_1 = require("../service/authService");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post('/api/auth/login', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.email) && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.password)) {
        const { email, password } = req.body;
        try {
            const jwt = yield (0, authService_1.login)({ email, password });
            res.status(200)
                .json({ token: jwt });
        }
        catch (e) {
            res.status(401)
                .json({ message: 'Invalid credentials' });
        }
    }
    else {
        res.status(400)
            .json({ message: 'Invalid email or password' });
    }
}));
router.post('/api/auth/logout', auth_1.authenticateMiddleware, (req, res) => {
    return res.send('Logged out!');
});
