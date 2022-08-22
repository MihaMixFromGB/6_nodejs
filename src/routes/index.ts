import express from 'express';

import { chatsRouter } from './chats.routes';
import { messagesRouter } from './messages.routes';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { refreshToketRouter } from './refreshToken.routes';

export const apiRouter = express.Router();

apiRouter.use('/chats', chatsRouter);
apiRouter.use('/messages', messagesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/refreshToken', refreshToketRouter);