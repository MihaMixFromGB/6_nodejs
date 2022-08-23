import express, { Express } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';
import path from "path";

import { ftpRouter } from './routes/ftp';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app
    .set('view engine', 'pug')
    .set('views', path.join(__dirname, 'views'))
    .use(express.static(path.join(__dirname,'public')))
    .use('/scripts', express.static(path.resolve('node_modules/socket.io/client-dist/')))
    .use('/', ftpRouter);

let count = 0;

io.on('connection', (socket) => {
    console.log('New connection');

    count++;
    emitAllClients(socket, 'USERS_COUNT', { count });

    socket.on('disconnect', () => {
        count--;
        emitAllClients(socket, 'USERS_COUNT', { count });
    })
});

server.listen(port, () => {
    console.log(`Server listhening on port ${port}`);
})

function emitAllClients(socket: Socket, eventName: string, payload: any) {
    socket.emit(eventName, payload);
    socket.broadcast.emit(eventName, payload);
}