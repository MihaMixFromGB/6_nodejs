import { Request, Response } from 'express';

import { usersService } from '../services/users.service';

class UsersController {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await usersService.getUsers();

            res.status(200).send({data: users});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const newUser = await usersService.createUser(req.body)

            res.status(200).send({data: newUser});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const updatedUser = await usersService.updateUser(req.body)

            res.status(200).send({data: updatedUser});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const deletedUser = await usersService.deleteUser(req.body.id)

            res.status(200).send({data: deletedUser});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }
}

export const usersController = new UsersController();