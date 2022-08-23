import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import path from 'path';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app
    .use('/scripts', express.static(path.resolve('node_modules/socket.io/client-dist/')))
    .get('/', (req, res) => {
        res.sendFile(__dirname + '/views/index.html');
    })
    .get('/status', (req, res) => {
        res.send('OK')
    });

const users: Record<string, string> = {};

io.on('connection', (socket) => {
    console.log('New connection');

    const id = socket.id;

    socket.on('CLIENT_CONN_EVENT', (data) => {
        users[id] = data.user + '_' + id;
        socket.broadcast.emit('SERVER_MSG', { msg: 'Connected: ' + users[id] });
    });

    socket.on('CLIENT_MSG', (data) => {
        socket.emit('SERVER_MSG', { msg: data.msg.split('').reverse().join('') });
        socket.broadcast.emit('SERVER_MSG', { msg: data.msg.split('').reverse().join('') });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('SERVER_MSG', { msg: 'Disconnected: ' + users[id] });
        delete users[id];
    });
});

server.listen(port, () => { 
    console.log(`Server is starting on ${port} port...`)
});