import {
  model,
  Schema,
  Types,
} from 'mongoose';

import { IPost } from './post.interface';

const PostSchema = new Schema<IPost>({
  user: { type: Types.ObjectId, required: true, ref: 'User' },
  hashTag: { type: String },
  status: { type: String },
  Images: { type: [String] },
  comments: { type: [{ type: Types.ObjectId, ref: 'Comment' }] },
  Reactions: {
    type: [
      {
        user: {  },
        totalLike: { type: Number, default: 0,},
        totalUnlike: { type: Number, default: 0 },
        totalLove: { type: Number, default: 0 },
      },
    ],
    default: [],
  },
  Location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  ShareCount: { type: Number, default: 0 },
  postVisibility: {
    public: { type: Boolean, default: false },
    friendlyOnly: { type: Boolean, default: false },
    onlyMe: { type: Boolean, default: false },
  },
});

export const PostModel = model<IPost>('Posts', PostSchema);