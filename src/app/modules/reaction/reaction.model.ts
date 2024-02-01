import { Schema, model } from 'mongoose';
import { IReaction } from './reaction.interface';
import { reactionEnum } from './reaction.constant';

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
    enum: reactionEnum,
    required: true,
  },
});

export const Reaction = model<IReaction>('Reaction', reactionSchema);
