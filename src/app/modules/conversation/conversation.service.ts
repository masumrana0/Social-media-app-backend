import { IConversation } from './conversation.interface';
import { Conversation } from './conversation.model';

// create conversation
const createConversation = async (
  payload: IConversation,
): Promise<IConversation | null> => {
  const result = await Conversation.create(payload);
  return result;
};

// get specific User conversations
const getInbox = async (userId: string): Promise<IConversation[] | null> => {
  const result = await Conversation.find({
    $or: [{ creator: userId }, { participant: userId }],
  });
  return result;
};

// delete Conversation
const deleteConversation = async (
  id: string,
): Promise<IConversation | null> => {
  const result = await Conversation.findByIdAndDelete(id);
  return result;
};

export const conversationService = {
  createConversation,
  deleteConversation,
  getInbox,
};
