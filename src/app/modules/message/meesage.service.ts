import { io } from '../../../app';
import { Conversation } from '../conversation/conversation.model';
import { IMessage } from './message.interface';
import { Message } from './message.model';

const sendMessage = async (payload: IMessage) => {
  //  checking isExisted Conversation
  const isExistConversation = await Conversation.findOne({
    creator: payload.sender,
    participant: payload.receiver,
  });

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

  // emit soket event
  io.emit('new_message', {
    message: {
      conversion_id: payload.conversation_id,
      sender: payload.sender,
      text: payload.text,
      // attachement: attachement,
      date_time: result.date_time,
    },
  });

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
