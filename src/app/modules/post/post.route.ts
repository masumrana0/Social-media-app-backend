import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ENUM_USER_ROLE } from '../../Enum/role';
import auth from '../../middlewares/auth';
import { postValidationZodSchema } from './post.validation';
import { postController } from './post.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.NORMAL_USER, ENUM_USER_ROLE.ADMIN),
  validateRequest(postValidationZodSchema.postZodScehma),
  postController.submitPost,
);

router.get('/', postController.getAllPost);

router.get('/:id', postController.getSinglePost);

export const PostRoutes = router;
