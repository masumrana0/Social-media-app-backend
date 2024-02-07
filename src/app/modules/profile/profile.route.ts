import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ENUM_USER_ROLE } from '../../Enum/role';
import auth from '../../middlewares/auth';
import { profileZodValidation } from './profile.validation';
import { profileController } from './profile.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.NORMAL_USER, ENUM_USER_ROLE.ADMIN),
  validateRequest(profileZodValidation.profileZodSchema),
  profileController.updateProfile,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.NORMAL_USER, ENUM_USER_ROLE.ADMIN),
  profileController.getProfile,
);

export const ProfileRoutes = router;
