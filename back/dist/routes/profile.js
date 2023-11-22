"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.profileRouter = router;
router.get('/api/me', auth_1.authenticateMiddleware, (req, res) => {
    return res.send(req.user);
});
