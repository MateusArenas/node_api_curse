import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';

import morgan from 'morgan';

import 'express-async-errors';

import { payloadHandling } from './handlers/payloadHandling';

import { router as usersRoutes } from './routes/users.routes';

import { errorHandling } from './handlers/errorHandling';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(payloadHandling);

app.use(usersRoutes);

app.use(errorHandling);

app.listen(80, () => {
  console.log('Server running in http://localhost:80/');
});
