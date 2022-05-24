import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeGetUserProfileController } from '@main/factories/controllers/user/GetUserProfileControllerFactory';
import { makeUpdateProfileEmailController } from '@main/factories/controllers/user/UpdateProfileEmailControllerFactory';
import { makeUpdateProfileNameController } from '@main/factories/controllers/user/UpdateProfileNameControllerFactory';
import { makeUpdateProfilePasswordController } from '@main/factories/controllers/user/UpdateProfilePasswordController';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/AuthenticationMiddlewareFactory';

const profileRoutes = Router();

profileRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetUserProfileController())
);

profileRoutes.patch(
  '/name',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateProfileNameController())
);

profileRoutes.patch(
  '/email',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateProfileEmailController())
);

profileRoutes.patch(
  '/password',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateProfilePasswordController())
);

export default profileRoutes;
