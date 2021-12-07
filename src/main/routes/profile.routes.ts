import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeGetProfileController } from '@main/factories/controllers/profile/GetProfileControllerFactory';
import { makeUpdateProfileEmailController } from '@main/factories/controllers/profile/UpdateProfileEmailControllerFactory';
import { makeUpdateProfileNameController } from '@main/factories/controllers/profile/UpdateProfileNameControllerFactory';
import { makeUpdateProfilePasswordController } from '@main/factories/controllers/profile/UpdateProfilePasswordController';

const profileRoutes = Router();

profileRoutes.get(
  '/',
  authenticationMiddleware,
  adaptRoute(makeGetProfileController())
);

profileRoutes.patch(
  '/name',
  authenticationMiddleware,
  adaptRoute(makeUpdateProfileNameController())
);

profileRoutes.patch(
  '/email',
  authenticationMiddleware,
  adaptRoute(makeUpdateProfileEmailController())
);

profileRoutes.patch(
  '/password',
  authenticationMiddleware,
  adaptRoute(makeUpdateProfilePasswordController())
);

export default profileRoutes;
