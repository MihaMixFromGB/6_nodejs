import { Message, IMessage } from '../models/message';

class MessagesService {
    async getMessagesByChat(chatId: string):Promise<IMessage[]> {
        return await Message.find({ chatId });
    }

    async createMessage(newMessage: IMessage): Promise<IMessage> {
        return await Message.create(newMessage);
    }

    async updateMessage(changedMessage: IMessage): Promise<IMessage> {
        const filter = { id: changedMessage.id };
        const update = { ...changedMessage }

        return (await Message.findOneAndUpdate(filter, update, { new: true })) as IMessage;
    }

    async deleteMessage(id: string): Promise<IMessage> {
        return (await Message.findOneAndDelete({ id })) as IMessage;
    }
}

export const messagesService = new MessagesService();