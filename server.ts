import express, { Express, Request, Response } from 'express';

const app: Express = express();

const port = 3000;

app
  .get('/', (req: Request, res: Response) => {
    res.send('Hello!');
  })
  .listen(port, () => {
    console.log(`Server listhening on port ${port}`)
  });