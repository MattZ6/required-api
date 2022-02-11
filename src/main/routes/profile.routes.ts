import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeGetUserProfileController } from '@main/factories/controllers/user/GetUserProfileControllerFactory';
import { makeUpdateProfileEmailController } from '@main/factories/controllers/user/UpdateProfileEmailControllerFactory';
import { makeUpdateProfileNameController } from '@main/factories/controllers/user/UpdateProfileNameControllerFactory';
import { makeUpdateProfilePasswordController } from '@main/factories/controllers/user/UpdateProfilePasswordController';

const profileRoutes = Router();

profileRoutes.get(
  '/',
  authenticationMiddleware,
  adaptRoute(makeGetUserProfileController())
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
