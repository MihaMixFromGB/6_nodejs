import { Request, Response } from 'express';

import { messagesService } from '../services/messages.service';

class MessagesController {
    async getMessagesByChat(req: Request, res: Response) {
        try {
            const messages = await messagesService.getMessagesByChat(req.body.chatId);

            res.status(200).send({data: messages});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async createMessage(req: Request, res: Response) {
        try {
            const newMessage = await messagesService.createMessage(req.body);

            res.status(200).send({data: newMessage});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async updateMessage(req: Request, res: Response) {
        try {
            const updatedMessage = await messagesService.updateMessage(req.body);

            res.status(200).send({data: updatedMessage});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }

    async deleteMessage(req: Request, res: Response) {
        try {
            const deletedMessage = await messagesService.deleteMessage(req.body.id);

            res.status(200).send({data: deletedMessage});
        } catch(err: any) {
            return res
                .status(500)
                .send({ message: err.message })
        }
    }
}

export const messagesController = new MessagesController();