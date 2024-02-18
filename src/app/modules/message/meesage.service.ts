import { io } from '../../../app';
import { IMessage } from './message.interface';
import { Message } from './message.model';

const sendMessage = async (payload: IMessage) => {
  let attachement = null;
  const result = await Message.create(payload);
  attachement = result?.attachment;

  // emit soket event
  io.emit('new_message', {
    message: {
      conversion_id: payload.conversation_id,
      sender: payload.sender,
      text: payload.text,
      attachement: attachement,
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
