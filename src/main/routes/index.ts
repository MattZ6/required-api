import { Router } from 'express'

import authenticationRoutes from './authentication.routes'
import profileRoutes from './profile.routes'

const routes = Router()

routes.use('/v1/auth', authenticationRoutes)
routes.use('/v1/profile', profileRoutes)

export default routes
