import express from 'express';
import cors from 'cors';
import { appDataSource } from './config/database';

const app = express();

// establish database connection
appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

// communicate only with json
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

app.listen(8080, () => {
  console.log('Listening to port 8080');
});
