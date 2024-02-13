import express from 'express';
import { AuthRoutes } from '../auth/auth.route';
import { PostRoutes } from '../post/post.route';
import { CommentRoutes } from '../comment/comment.route';
import { ReactionRoutes } from '../reaction/reaction.route';
import { ProfileRoutes } from '../profile/profile.route';
import { ConversationRoute } from '../conversation/conversation.route';

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
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/reaction',
    route: ReactionRoutes,
  },
  {
    path: '/conversation',
    route: ConversationRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
