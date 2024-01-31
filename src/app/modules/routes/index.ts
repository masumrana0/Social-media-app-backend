import express from 'express';
import { AuthRoutes } from '../auth/auth.route';
import { ProfileRoutes } from '../profile/profile.route';


const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
