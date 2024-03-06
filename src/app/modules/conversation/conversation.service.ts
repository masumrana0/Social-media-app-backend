import { profileService } from '../profile/profile.service';
import { IUserSpecificField } from '../user/user.interface';
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
  const conversations = await Conversation.find({
    $or: [{ creator: userId }, { participant: userId }],
  }).sort({
    createdAt: -1,
  });

  if (conversations.length > 0) {
    const conversationPromises = conversations?.map(
      async (conversation: IConversation) => {
        // creator profile
        const creatorProfile = await profileService.getUserCommonData(
          conversation.creator as unknown as string,
        );

        // participant Profile
        const participantProfile = await profileService.getUserCommonData(
          conversation.creator as unknown as string,
        );

        const updatedConversation = conversation.toObject() as IConversation;

        updatedConversation.creator = creatorProfile as IUserSpecificField;
        updatedConversation.participant =
          participantProfile as IUserSpecificField;

        return updatedConversation as IConversation;
      },
    );

    const result = await Promise.all(conversationPromises);
    return result;
  }
  return [];
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
