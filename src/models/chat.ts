import { Schema, model } from 'mongoose';

export interface IChat {
    id: string,
    title: string
}

const chatSchema = new Schema<IChat>(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
    }, 
    {
        collection: "chats",
        // _id: false,
        versionKey: false
    }
);

export const Chat = model<IChat>('Chat', chatSchema);