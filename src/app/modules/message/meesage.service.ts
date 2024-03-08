import { getReceiverSocketId, io } from '../../../app';
import { Conversation } from '../conversation/conversation.model';
import { IMessage } from './message.interface';
import { Message } from './message.model';

const sendMessage = async (payload: IMessage) => {
  console.log(payload);

  // Check if there's an existing conversation with sender and receiver regardless of order
  const isExistConversation = await Conversation.findOne({
    $or: [
      {
        creator: payload.sender,
        participant: payload.receiver,
      },
      {
        creator: payload.receiver,
        participant: payload.sender,
      },
    ],
  });
  console.log(isExistConversation);

  //  if is Existed Conversation then it's set conversation_id
  if (isExistConversation) {
    payload.conversation_id = isExistConversation?._id;
  }

  // if does not existed conversation then conversation will be create
  if (!isExistConversation) {
    const newConversation = await Conversation.create({
      creator: payload.sender,
      participant: payload.receiver,
    });

    payload.conversation_id = newConversation._id;
  }

  // let attachement = null;
  const result = await Message.create(payload);
  // attachement = result?.attachment;

  const receiverSocketId = getReceiverSocketId(payload.receiver as string);
  if (receiverSocketId) {
    // emit soket event
    io.to(receiverSocketId).emit('new_message', {
      _id: result?._id,
      conversion_id: payload.conversation_id,
      sender: payload.sender,
      text: payload.text,
      date_time: result.date_time,
    });
  }

  return result;
};

const getMessages = async (
  conversation_id: string,
): Promise<IMessage[] | null> => {
  const result = await Message.find({ conversation_id: conversation_id });
  return result;
};

export const messageService = {
  sendMessage,
  getMessages,
};
