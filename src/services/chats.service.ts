import { connect } from 'mongoose';

import { Chat, IChat } from '../models/chat';

class ChatsService {
    async getChats():Promise<IChat[]> {
        await connect(process.env.DB_CONN as string);

        const chats = await Chat.find();

        return chats;
    }

    async createChat(newChat: IChat):Promise<IChat> {
        await connect(process.env.DB_CONN as string);

        const data = await Chat.create(newChat);
        
        return data;
    }

    async updateChat(changedChat: IChat):Promise<IChat> {
        await connect(process.env.DB_CONN as string);

        const filter = { id: changedChat.id };
        const update = { ...changedChat };

        const data = (await Chat.findOneAndUpdate(filter, update, { new: true })) as IChat;

        return data;
    }

    async deleteChat(id: string):Promise<IChat> {
        await connect(process.env.DB_CONN as string);

        const data = (await Chat.findOneAndDelete({ id })) as IChat;

        return data;
    }
}

export const chatsService = new ChatsService();