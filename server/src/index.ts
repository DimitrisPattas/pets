import express from 'express';
import cors from 'cors';

import { dbManager } from './config/database';

import userRoutes from './routes/api/user.routes';
import petRoutes from './routes/api/pet.routes';

const app = express();

dbManager.initialize().then(() => {
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000'],
    })
  );

  // Use the users routes
  app.use('/api', userRoutes);
  app.use('/api', petRoutes);

  app.listen(8080, () => {
    console.log('Listening to port 8080');
  });
});
