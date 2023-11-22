import {IImage, Image} from '../models/image';
import multer from 'multer';
import {Response, Router} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {ScheduleDayModel} from '../models/scheduleDay';

const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const router = Router();

router.post('/api/image/upload', upload.single('image'), authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const image = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await image.save();
    res.send('Image téléchargée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'image :' + error);
    res.status(500).send('Erreur lors du téléchargement de l\'image');
  }
});

router.get('/api/image/:id', async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (!image) {
    return res.status(404).send('Image non trouvée');
  }
  res.set('Content-Type', image.contentType);
  res.send(image.data);
});

router.get('/api/images', async (_req, res) => {
  try {
    const images = await Image.find({}, '_id');

    if (images.length > 0) {
      const imageIds = images.map(image => image._id);
      res.json(imageIds);
    } else {
      res.status(204).json({ message: 'No Images' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/api/image/:id', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image)
      await image.deleteOne();
    res.sendStatus(200);
  } catch (e) {
    console.warn('Error while deleting account', e);
    res.sendStatus(500);
  }
});

export {router as imageRouter};
