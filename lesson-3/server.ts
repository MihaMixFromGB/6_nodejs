import express, { Express, Request, Response } from 'express';
import path from "path";

import { ftpRouter } from './routes/ftp';

const app: Express = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')));

app.use('/', ftpRouter);

app.listen(port, () => {
    console.log(`Server listhening on port ${port}`);
})