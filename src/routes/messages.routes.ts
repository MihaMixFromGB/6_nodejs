import express from 'express';

import { messagesController } from '../controllers/messages.controller';

export const messagesRouter = express.Router();
messagesRouter
    .route('/')
    .get(messagesController.getMessagesByChat)
    .post(messagesController.createMessage)
    .put(messagesController.updateMessage)
    .delete(messagesController.deleteMessage)
