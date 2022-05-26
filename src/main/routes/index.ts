import { Router } from 'express';

import authenticationRoutes from './authentication.routes';
import healthRoutes from './health.routes';
import profileRoutes from './profile.routes';

const routes = Router();

routes.use('/v1/auth', authenticationRoutes);
routes.use('/v1/profile', profileRoutes);

routes.use('/health', healthRoutes);

export default routes;
