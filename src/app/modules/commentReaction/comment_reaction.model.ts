import { Schema, model } from 'mongoose';
import { reactionEnum } from '../reaction/reaction.constant';
import { IComment_Reaction } from './comment_reaction.interface';

const reactionSchema = new Schema<IComment_Reaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
    reaction: {
      type: String,
      enum: reactionEnum,
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

export const Comment_Reaction = model<IComment_Reaction>(
  'Comment_Reaction',
  reactionSchema,
);
