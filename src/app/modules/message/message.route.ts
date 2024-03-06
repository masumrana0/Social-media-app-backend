import express from 'express';
import { MessageController } from './message.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../Enum/role';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  MessageController.sendMessage,
);

router.get('/', MessageController.getMessage);

export const MessageRoute = router;
