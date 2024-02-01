import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ENUM_USER_ROLE } from '../../Enum/role';
import auth from '../../middlewares/auth';
import { reactionValidationSchema } from './reaction.validation';
import { ReactionController } from './reaction.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  validateRequest(reactionValidationSchema.reactionZodSchema),
  ReactionController.makeAndUndoReaction,
);

export const ReactionRoutes = router;
