import jwt from "jsonwebtoken";
import { MongooseError } from "mongoose";

import { UserToken, IUserToken } from "../models/UserToken";

export const verifyRefreshToken = (refreshToken: string) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY as string;

    return new Promise((resolve, reject) => {
        UserToken.findOne({ token: refreshToken }, (err: MongooseError, doc: IUserToken) => {
            if (!doc)
                return reject({ error: true, message: "Invalid refresh token" });

            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err)
                    return reject({ error: true, message: "Invalid refresh token" });
                resolve({
                    tokenDetails,
                    error: false,
                    message: "Valid refresh token",
                });
            });
        });
    });
};