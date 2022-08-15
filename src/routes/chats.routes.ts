import express from 'express';

import { chatsController } from '../controllers/chats.controller';

export const chatsRouter = express.Router();
chatsRouter
    .route('/')
    .get(chatsController.getChats)
    .post(chatsController.createChat)
    .put(chatsController.updateChat)
    .delete(chatsController.deleteChat)