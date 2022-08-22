import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { dbConnect } from "./utils/dbConnect";
import { apiRouter } from './routes/index';

const app: Express = express();
dotenv.config();
dbConnect();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello! Go to /api');
})

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api', apiRouter)
  .listen(port, () => {
    console.log(`Server listhening on port ${port}`)
  });