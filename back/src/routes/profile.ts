import {Router, Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';

const router = Router();

router.get('/api/me', authenticateMiddleware, (req: AuthenticatedRequest, res: Response) => {
  return res.send(req.user);
});

export {router as profileRouter};
