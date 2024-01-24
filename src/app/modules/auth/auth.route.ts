import express from 'express';

import { ENUM_USER_ROLE } from '../../Enum/role';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/ValidateRequest';
import { userValidationZodSchema } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { authValidationSchema } from './auth.validation';
import { LoginController } from './login/login.controller';
import { loginZodSchema } from './login/login.validation';
import { RegistrationController } from './registration/registration.controller';

const router = express.Router();

router.get('/verification', AuthController.verification);
router.get(
  '/verification/client',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  AuthController.verificationEmailSendByClient,
);

router.post(
  '/login',
  validateRequest(loginZodSchema.userLoginZodSchema),
  LoginController.userLogin,
);

router.post(
  '/register',
  validateRequest(userValidationZodSchema.UserZodScehma),
  RegistrationController.Registration,
);

router.post(
  '/refresh-token',
  validateRequest(authValidationSchema.refreshTokenZodSchema),
  AuthController.refreshToken,
);

router.post(
  '/change-password',
  validateRequest(authValidationSchema.changePasswordZodSchema),
  auth(ENUM_USER_ROLE.NORMAL_USER, ENUM_USER_ROLE.ADMIN),
  AuthController.changePassword,
);

router.get('/get-users-to-make-community', AuthController.getUsersToMakeCommunity);

export const AuthRoutes = router;
