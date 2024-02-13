import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';

import morgan from 'morgan';

import 'express-async-errors';

import { errorHandling } from './handlers/errorHandling';

import { router as usersRoutes } from './routes/users.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(usersRoutes);

app.use(errorHandling);

app.listen(80, () => {
  console.log('Server running in http://localhost:80/');
});
