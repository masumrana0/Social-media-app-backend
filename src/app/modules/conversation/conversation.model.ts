import { Schema, Types, model } from 'mongoose';
import { IConversation } from './conversation.interface';

const conversationSchema = new Schema<IConversation>(
  {
    creator: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participant: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Conversation = model<IConversation>(
  'Conversation',
  conversationSchema,
);
