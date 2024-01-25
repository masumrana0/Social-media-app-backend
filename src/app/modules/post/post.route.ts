import express from 'express';

import validateRequest from '../../middlewares/ValidateRequest';
import { PostController } from './post.controller';
import { postZodSchema } from './post.validation';

// import { AuthController } from './auth.controller';
// import { authValidationSchema } from './auth.validation';
// import { LoginController } from './login/login.controller';
// import { loginZodSchema } from './login/login.validation';
// import { RegistrationController } from './registration/registration.controller';

const router = express.Router();



router.post(
  '/create-post',
  validateRequest(postZodSchema.usePostZodSchema),
  PostController.createPost
);


router.get('/get-posts', PostController.getPosts);

export const PostRoutes = router;
