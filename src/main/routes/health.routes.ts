import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/route';
import { makeHealthCheckController } from '@main/factories/controllers/HealthCheck';

const healthRoutes = Router();

healthRoutes.get('/', adaptRoute(makeHealthCheckController()));

export default healthRoutes;
