import express from 'express';
import { AuthRoutes } from '../auth/auth.route';
import { PostRoutes } from '../post/post.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
