import { Schema, Types, model } from 'mongoose';
import { IPost } from './post.interface';

const PostSchema = new Schema<IPost>({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  postText: {
    type: String,
    required: true,
  },
  Images: { type: [String] },

  ShareCount: {
    type: Number,
    default: 0,
  },
});

export const Post = model<IPost>('Post', PostSchema);
