import express from 'express';

import { AuthUserRoutes } from '../modules/auth/auth.routes';

import { HouseRoutes } from '../modules/house/house.routes';
import { UserRoutes } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthUserRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/house',
    route: HouseRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
