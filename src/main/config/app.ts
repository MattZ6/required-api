import cors from 'cors';
import express from 'express';

import routes from '@main/routes';

import { setupHealthCheckEndpoint } from './healthCheck';
import { setupHelmet } from './helmet';
import { setupSwagger } from './swagger';

const app = express();

setupHelmet(app);

setupSwagger(app);
setupHealthCheckEndpoint(app);

app.use(express.json());

app.use(cors());

app.use(routes);

export default app;
