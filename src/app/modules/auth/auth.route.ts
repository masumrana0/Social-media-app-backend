import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ENUM_USER_ROLE } from '../../Enum/role';
import { loginZodSchema } from './login/login.validation';
import auth from '../../middlewares/auth';
import { AuthController } from './auth.controller';
import { userValidationZodSchema } from '../user/user.validation';
import { RegistrationController } from './registration/registration.controller';
import { authValidationSchema } from './auth.validation';
import { LoginController } from './login/login.controller';

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
  // validateRequest(userValidationZodSchema.UserZodScehma),
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

export const AuthRoutes = router;
