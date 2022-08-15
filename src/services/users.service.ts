import { connect } from 'mongoose';

import { User, IUser } from '../models/user';

class UsersService {
    async getUsers():Promise<IUser[]> {
        await connect(process.env.DB_CONN as string);

        const users = await User.find();

        return users;
    }

    async createUser(newUser: IUser):Promise<IUser> {
        await connect(process.env.DB_CONN as string);

        const data = await User.create(newUser);

        return data;
    }

    async updateUser(changedUser: IUser):Promise<IUser> {
        await connect(process.env.DB_CONN as string);

        const filter = { id: changedUser.id };
        const update = { ...changedUser }

        const data = (await User.findOneAndUpdate(filter, update, { new: true })) as IUser;

        return data;
    }

    async deleteUser(id: string): Promise<IUser> {
        await connect(process.env.DB_CONN as string);

        const data = (await User.findOneAndDelete({ id })) as IUser;

        return data;
    }
}

export const usersService = new UsersService();