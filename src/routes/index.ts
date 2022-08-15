import express from 'express';

import { chatsRouter } from './chats.routes';
import { messagesRouter } from './messages.routes';
import { usersRouter } from './users.routes';

export const apiRouter = express.Router();

apiRouter.use('/chats', chatsRouter);
apiRouter.use('/messages', messagesRouter);
apiRouter.use('/users', usersRouter);