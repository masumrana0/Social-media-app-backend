import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ENUM_USER_ROLE } from '../../Enum/role';
import auth from '../../middlewares/auth';
import { CommentreactionValidationSchema } from './comment_reaction.validation';
import { Comment_ReactionController } from './comment_reaction.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  validateRequest(CommentreactionValidationSchema.reactionZodSchema),
  Comment_ReactionController.makeAndUndoReaction,
);

router.get(
  '/:comment_id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  Comment_ReactionController.getAllReaction,
);

export const ReactionRoutes = router;
