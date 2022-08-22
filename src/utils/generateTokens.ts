import jwt from "jsonwebtoken";

import { IUser } from "../models/user";
import { UserToken } from "../models/UserToken";

export const generateTokens = async (user: IUser) => {
    try {
        const payload = { id: user.id };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
            { expiresIn: "14m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
            { expiresIn: "30d" }
        );

        const userToken = await UserToken.findOne({ userId: user.id });
        if (userToken) await userToken.remove();

        await UserToken.create({ userId: user.id, token: refreshToken });
        
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};