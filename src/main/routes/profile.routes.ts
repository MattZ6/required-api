import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeGetUserProfileController } from '@main/factories/controllers/user/GetProfile';
import { makeUpdateProfileEmailController } from '@main/factories/controllers/user/UpdateProfileEmail';
import { makeUpdateProfileNameController } from '@main/factories/controllers/user/UpdateProfileName';
import { makeUpdateProfilePasswordController } from '@main/factories/controllers/user/UpdateProfilePassword';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

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
