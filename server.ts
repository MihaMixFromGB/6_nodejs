import express, { Express, Request, Response } from 'express';

const app: Express = express();

const port = process.env.PORT;

app
  .get('/', (req: Request, res: Response) => {
    console.log("port", port);

    const status = connectToDB();

    res.send(status);
  })
  .listen(port, () => {
    console.log(`Server listhening on port ${port}`)
  });

function connectToDB(): string {
  const mongo = require('mongodb').MongoClient

  mongo.connect(
    'mongodb://localhost:27017',
    (err: any, client: any) => {
      if (err) {
        return 'Connection error: ' + err
        // throw err
      }

      client.close()
    }
  )

  return 'Connected and closed';
}