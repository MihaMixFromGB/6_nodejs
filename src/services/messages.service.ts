import { connect } from 'mongoose';

import { Message, IMessage } from '../models/message';

class MessagesService {
    async getMessagesByChat(chatId: string):Promise<IMessage[]> {
        await connect(process.env.DB_CONN as string);

        const messages = await Message.find({ chatId });

        return messages;
    }

    async createMessage(newMessage: IMessage): Promise<IMessage> {
        await connect(process.env.DB_CONN as string);

        const data = await Message.create(newMessage);

        return data;
    }

    async updateMessage(changedMessage: IMessage): Promise<IMessage> {
        await connect(process.env.DB_CONN as string);

        const filter = { id: changedMessage.id };
        const update = { ...changedMessage }

        const data = (await Message.findOneAndUpdate(filter, update, { new: true })) as IMessage;

        return data;
    }

    async deleteMessage(id: string): Promise<IMessage> {
        await connect(process.env.DB_CONN as string);

        const data = (await Message.findOneAndDelete({ id })) as IMessage;

        return data;
    }
}

export const messagesService = new MessagesService();