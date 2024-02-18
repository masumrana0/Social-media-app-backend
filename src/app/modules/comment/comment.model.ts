import mongoose, { Schema, Types } from 'mongoose';
import { IComment } from './comment.interface';
const CommentSchema = new Schema<IComment>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    comment: {
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

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
