import express from 'express';
import cors from 'cors';

import { router as tasks } from './routes/tasks';

const app = express();

app.use(cors());

app.use(express.json());

app.use(tasks);

app.listen(80, () => {
  console.log('Server running in http://localhost:80/');
});
