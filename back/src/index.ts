import APP from './app';
import dotenv from 'dotenv';
import {connect} from './mongodb';
import mongoose from 'mongoose';

const PORT = 3001;

APP.listen(PORT, () => {
  const env = APP.get('env');

  console.log(`Starting Express Application (${env} mode)...`);
  dotenv.config({path: (env === 'production' ? '.env.production' : '.env')});

  connect()
    .then(() => console.log(`Express is listening at http://localhost:${PORT}`))
    .catch(reason => console.error('Unable to connect to database: ' + reason));
});

APP.on('close', async () => {
  await mongoose.disconnect();
});
