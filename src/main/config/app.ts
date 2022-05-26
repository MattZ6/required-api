import cors from 'cors';
import express from 'express';

import routes from '@main/routes';

import { setupSwagger } from './swagger';

const app = express();

setupSwagger(app);

app.use(express.json());

app.use(cors());

app.use(routes);

export default app;
