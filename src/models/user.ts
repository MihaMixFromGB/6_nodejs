import { Schema, model } from 'mongoose';

export interface IUser {
    id: string,
    firstname: string,
    lastname: string,
    nickname: string,
    email: string,
    password: string
};

const userSchema = new Schema<IUser>(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        firstname: { type: String },
        lastname: { type: String },
        nickname: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        collection: "users",
        versionKey: false
    }
);

export const User = model<IUser>('User', userSchema);