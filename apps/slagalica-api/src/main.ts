import express from 'express';
import { connect } from 'mongoose';
import * as bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { environment } from './environments/environment.prod';
import {
  UsersController,
  WordsController,
  SpojnicaGameController,
  AsocijacijaGameController
} from './app/controllers';
import { Logger, setupServerLogging } from './app/util';

import { seedUsers } from './tools/seed-users';
import { createGameEngine } from './app/game-engine';

async function boot() {
  try {
    const app = express();
    app.use(bodyParser.json());
    app.use(fileUpload());
    setupServerLogging(app);

    await connect(
      environment.mongo,
      { useNewUrlParser: true }
    );
    Logger.info('Mongo started');

    app.get('/api', (req, res) => {
      res.send({ message: 'Welcome to slagalica-api!' });
    });

    app.use('/api/users', UsersController);
    app.use('/api/words', WordsController);
    app.use('/api/spojnica-game', SpojnicaGameController);
    app.use('/api/asocijacija-game', AsocijacijaGameController);
    const port = process.env.port || 3333;
    const server = app.listen(port, () => {
      Logger.info(`API Listening at http://localhost:${port}/api`);
      app.use('/game', createGameEngine(server));
      Logger.info(`Game Server Listening at ws://localhost:${port}`);
      // seedUsers();
    });

    server.on('error', Logger.error);
  } catch (err) {
    Logger.error(err);
  }
}

boot().then(() => Logger.info('Slagalica Api Live'));
