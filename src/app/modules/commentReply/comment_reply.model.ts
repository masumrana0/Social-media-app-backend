import mongoose, { Schema, Types } from 'mongoose';
import { IComment_Reply } from './comment_reply.interface';

const Comment_ReplySchema = new Schema<IComment_Reply>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
    comment_reply: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Comment_Reply = mongoose.model<IComment_Reply>(
  'Comment_Reply',
  Comment_ReplySchema,
);
