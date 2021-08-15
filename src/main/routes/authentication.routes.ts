import { Router } from 'express';

import { adaptRoute } from '../adapters/express/express-route-adapter';
import { makeSignUpController } from '../factories/controllers/sign-up';

const authenticationRoutes = Router();

authenticationRoutes.post('/account', adaptRoute(makeSignUpController()));

export default authenticationRoutes;
