import express, {json} from 'express';
import {connect, isConnected} from './mongodb';
import cors from 'cors';
import {authRouter} from './routes/auth';
import {profileRouter} from './routes/profile';
import {updateRouter} from './routes/update';
import {scheduleRouter} from './routes/schedule';
import {imageRouter} from './routes/image';
import {register} from './service/authService';

const APP = express();

APP.get('/api/ping', (_req, res) => {
  register({email: 'thomas.joan.pl@gmail.com', password: 'Tktmongars@69'})
  register({email: 'arthur.pacaud@epitech.eu', password: 'Tktmongars@69'})
  res.status(200)
    .send('Pong');
});

APP.get('/api/status', (_req, res) => {
  res.sendStatus(isConnected() ? 200 : 500);
});

APP.use(cors());
APP.use(json());
APP.use(authRouter);
APP.use(profileRouter);
APP.use(updateRouter);
APP.use(scheduleRouter);
APP.use(imageRouter);
export default APP;
