import { Schema, Types, model } from 'mongoose';
import { IPost } from './post.interface';

const PostSchema = new Schema<IPost>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    postText: {
      type: String,
      required: true,
    },
    images: { type: [String] },
    shareCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<IPost>('Post', PostSchema);
