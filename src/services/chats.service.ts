import { Chat, IChat } from '../models/chat';

class ChatsService {
    async getChats():Promise<IChat[]> {
        return await Chat.find();
    }

    async createChat(newChat: IChat):Promise<IChat> {
        return await Chat.create(newChat);
    }

    async updateChat(changedChat: IChat):Promise<IChat> {
        const filter = { id: changedChat.id };
        const update = { ...changedChat };

        return (await Chat.findOneAndUpdate(filter, update, { new: true })) as IChat;
    }

    async deleteChat(id: string):Promise<IChat> {
        return (await Chat.findOneAndDelete({ id })) as IChat;
    }
}

export const chatsService = new ChatsService();