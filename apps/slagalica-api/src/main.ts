import * as express from 'express';
import { connect } from 'mongoose';
import { environment } from './environments/environment.prod';
import {
  UsersController,
  WordsController,
  SpojnicaGameController
} from './app/controllers';
import { Logger } from './app/util';
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload';
import { seedUsers } from './tools/seed-users';

async function boot() {
  try {
    const app = express();
    app.use(bodyParser.json());
    app.use(fileUpload());

    await connect(
      environment.mongo,
      { useNewUrlParser: true }
    );
    Logger.logSuccess('Mongo started');

    app.get('/api', (req, res) => {
      res.send({ message: 'Welcome to slagalica-api!' });
    });

    app.use('/api/users', UsersController);
    app.use('/api/words', WordsController);
    app.use('/api/spojnica-game', SpojnicaGameController);

    const port = process.env.port || 3333;
    const server = app.listen(port, () => {
      Logger.logSuccess(`Listening at http://localhost:${port}/api`);
      // seedUsers();
    });
    server.on('error', Logger.logError);
  } catch (err) {
    Logger.logError(err);
  }
}

boot().then(() => Logger.logSuccess('Slagalica Api Live'));
