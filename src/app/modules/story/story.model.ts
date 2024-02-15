import { Schema, Types, model } from 'mongoose';
import { IStory } from './story.interface';

const storySchema = new Schema<IStory>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    story: {
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

export const Story = model<IStory>('Post', storySchema);
