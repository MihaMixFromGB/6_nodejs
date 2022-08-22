import { User, IUser } from '../models/user';

class UsersService {
    async getUsers():Promise<IUser[]> {
        return await User.find();
    }

    async createUser(newUser: IUser):Promise<IUser> {
        return await User.create(newUser);
    }

    async updateUser(changedUser: IUser):Promise<IUser> {
        const filter = { id: changedUser.id };
        const update = { ...changedUser }

        return (await User.findOneAndUpdate(filter, update, { new: true })) as IUser;
    }

    async deleteUser(id: string): Promise<IUser> {
        return (await User.findOneAndDelete({ id })) as IUser;
    }
}

export const usersService = new UsersService();