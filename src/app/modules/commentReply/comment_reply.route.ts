import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ENUM_USER_ROLE } from '../../Enum/role';
import auth from '../../middlewares/auth';
import { comment_ReplyValidationSchema } from './comment_reply.validation';
import { Comment_replyController } from './comment_Reply.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  validateRequest(comment_ReplyValidationSchema.comment_ReplyZodSchema),
  Comment_replyController.submitComment_Reply,
);

router.get(
  '/:comment_id',
  Comment_replyController.getSpecificPostCommentReplies,
);

router.patch(
  '/:comment_reply_id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  Comment_replyController.updateSpecificComment_reply,
);

router.delete(
  '/:comment_reply_id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.NORMAL_USER),
  Comment_replyController.deleteComment_reply,
);

export const Comment_ReplyRoutes = router;
