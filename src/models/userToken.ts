import { Schema, model } from "mongoose";

export interface IUserToken {
    userId: Schema.Types.ObjectId,
    token: string,
    createdAt: Date
};

const userTokenSchema = new Schema<IUserToken>({
    userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

export const UserToken = model<IUserToken>("UserToken", userTokenSchema);