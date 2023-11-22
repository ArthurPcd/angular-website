import {Router, Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {updateUserPassword} from '../service/profileService';
import {updateScheduleDay} from '../service/schedulesService';
import {ScheduleDayModel} from '../models/scheduleDay';

const router = Router();

router.put('/api/schedules/update', authenticateMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    if (data.day) {
      await updateScheduleDay(data.day);
      res.sendStatus(200);
    } else {
      res.status(400).json({message: `Missing schedule day in body`});
    }
  } catch (error) {
    console.error('Error updating user schedule day', error);
    res.sendStatus(500);
  }
});

router.get('/api/schedules',async (_req, res) => {
  try {
    const schedules = await ScheduleDayModel.find({});
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export {router as scheduleRouter};
