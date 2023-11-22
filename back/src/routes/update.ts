import {Router, Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {updateUserEmail, updateUserPassword} from '../service/profileService';

const router = Router();

router.put('/api/update/email', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const data = req.body;
    if (data.email) {
      await updateUserEmail(userId, data.email);
      res.sendStatus(200);
    } else {
      res.status(400).json({message: `Missing email in body`});
    }
  } catch (error) {
    console.error('Error updating user email', error);
    res.sendStatus(500);
  }
});

router.put('/api/update/password', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const data = req.body;
    if (data.password) {
      await updateUserPassword(userId, data.password);
      res.sendStatus(200);
    } else {
      res.status(400).json({message: `Missing password in body`});
    }
  } catch (error) {
    console.error('Error updating user password', error);
    res.sendStatus(500);
  }
});

export {router as updateRouter};
