import express from 'express';
import { storyController } from './story.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../Enum/role';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  storyController.createStory,
);

export const storyRoutes = router;
