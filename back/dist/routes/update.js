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
exports.updateRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const profileService_1 = require("../service/profileService");
const router = (0, express_1.Router)();
exports.updateRouter = router;
router.put('/api/update/email', auth_1.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const data = req.body;
        if (data.email) {
            yield (0, profileService_1.updateUserEmail)(userId, data.email);
            res.sendStatus(200);
        }
        else {
            res.status(400).json({ message: `Missing email in body` });
        }
    }
    catch (error) {
        console.error('Error updating user email', error);
        res.sendStatus(500);
    }
}));
router.put('/api/update/password', auth_1.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const data = req.body;
        if (data.password) {
            yield (0, profileService_1.updateUserPassword)(userId, data.password);
            res.sendStatus(200);
        }
        else {
            res.status(400).json({ message: `Missing password in body` });
        }
    }
    catch (error) {
        console.error('Error updating user password', error);
        res.sendStatus(500);
    }
}));
