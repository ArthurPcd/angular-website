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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const image_1 = require("../models/image");
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
exports.imageRouter = router;
router.post('/api/image/upload', upload.single('image'), auth_1.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = new image_1.Image({
            data: req.file.buffer,
            contentType: req.file.mimetype,
        });
        yield image.save();
        res.send('Image téléchargée avec succès !');
    }
    catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'image :' + error);
        res.status(500).send('Erreur lors du téléchargement de l\'image');
    }
}));
router.get('/api/image/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield image_1.Image.findById(req.params.id);
    if (!image) {
        return res.status(404).send('Image non trouvée');
    }
    res.set('Content-Type', image.contentType);
    res.send(image.data);
}));
router.get('/api/images', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield image_1.Image.find({}, '_id');
        if (images.length > 0) {
            const imageIds = images.map(image => image._id);
            res.json(imageIds);
        }
        else {
            res.status(204).json({ message: 'No Images' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.delete('/api/image/:id', auth_1.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield image_1.Image.findById(req.params.id);
        if (image)
            yield image.deleteOne();
        res.sendStatus(200);
    }
    catch (e) {
        console.warn('Error while deleting account', e);
        res.sendStatus(500);
    }
}));
