import { Schema, model } from 'mongoose';

export interface IMessage {
    id: string,
    text: string,
    chatId: string,
    userId: string
}

const messageSchema = new Schema<IMessage>(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        text: {
            type: String,
            required: true
        },
        chatId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        collection: "messages",
        // _id: false,
        versionKey: false
    }
);

export const Message = model<IMessage>('Message', messageSchema);