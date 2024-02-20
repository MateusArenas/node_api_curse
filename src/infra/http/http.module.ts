import http from 'http';

import express from 'express';
import cors from 'cors';

import morgan from 'morgan';

import 'express-async-errors';

import { dataHandling } from './handlers/dataHandling';

import { router as usersRoutes } from './routes/users.routes';

import { errorHandling } from './handlers/errorHandling';

// Cria nossa aplicação express
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(dataHandling);

app.use(usersRoutes);

app.use(errorHandling);

// Define e configura o protocolo http
export const HttpModule = http.createServer(app);
