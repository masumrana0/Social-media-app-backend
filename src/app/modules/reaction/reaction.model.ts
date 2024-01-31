import { Schema, model } from 'mongoose';
import { IReaction } from './reaction.interface';

const reactionSchema = new Schema<IReaction>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  reaction: {
    type: String,
    enum: ['like', 'love', 'sad', 'angry'],
    required: true,
  },
});

export const Reaction = model<IReaction>('Reaction', reactionSchema);
