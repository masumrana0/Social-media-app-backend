import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ENUM_USER_ROLE } from '../../Enum/role';
import auth from '../../middlewares/auth';
import { commentValidationSchema } from './comment.validation';
import { CommentController } from './comment.controller';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  validateRequest(commentValidationSchema.commentZodSchema),
  CommentController.submitComment,
);

router.get('/:postId', CommentController.getSpecificPostComments);

router.patch('/:commentId', CommentController.updateSpecificComment);

router.delete('/:commentId', CommentController.deleteComment);

export const CommentRoutes = router;
