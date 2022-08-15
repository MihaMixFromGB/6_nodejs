import { Request, Response } from 'express';

import { chatsService } from '../services/chats.service';

class ChatsController {
    async getChats(req: Request, res: Response) {
        try {
            const chats = await chatsService.getChats();

            res.status(200).send({data: chats});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async createChat(req: Request, res: Response) {
        try {
            const newChat = await chatsService.createChat(req.body)

            res.status(200).send({data: newChat});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async updateChat(req: Request, res: Response) {
        try {
            const updatedChat = await chatsService.updateChat(req.body);

            res.status(200).send({data: updatedChat});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async deleteChat(req: Request, res: Response) {
        try {
            const deletedChat = await chatsService.deleteChat(req.body.id);

            res.status(200).send({data: deletedChat});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }
}

export const chatsController = new ChatsController();