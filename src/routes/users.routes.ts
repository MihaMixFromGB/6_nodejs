import express from 'express';

import { usersController } from '../controllers/users.controller';

export const usersRouter = express.Router();
usersRouter
    .route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)