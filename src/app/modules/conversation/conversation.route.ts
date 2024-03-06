import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { conversationValidation } from './conversation.validation';
import { conversationController } from './conversation.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../Enum/role';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  // validateRequest(conversationValidation.conversationZodSchema),
  conversationController.createConversation,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  conversationController.getInbox,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  conversationController.deleteConversation,
);

export const ConversationRoute = router;
