import express from 'express';
import cors from 'cors';

import { dbManager } from './config/database';

import usersRoutes from './routes/api/user.routes';

const app = express();

dbManager.initialize().then(() => {
  // communicate only with json
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000'],
    })
  );

  // Use the users routes
  app.use('/api', usersRoutes);

  app.listen(8080, () => {
    console.log('Listening to port 8080');
  });
});
