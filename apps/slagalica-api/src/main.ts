import express from 'express';
import { connect } from 'mongoose';
import * as bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import RateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import { environment } from './environments/environment.prod';
import * as controllers from '@slagalica-api/controllers';
import { Logger, setupServerLogging } from '@slagalica-api/util';
import { seedUsers } from './tools/seed-users';
import { createGameServer } from '@slagalica-api/game';
import {
  createAuthMiddleware,
  interceptAuthError
} from '@slagalica-api/services/token';
import { isAdmin, isSupervizor } from '@slagalica-api/services/permissions';

async function boot() {
  try {
    await connect(
      environment.mongo,
      { useNewUrlParser: true }
    );
    Logger.info('Mongo started');

    const app = express();
    setupBaseMiddleware(app);
    setupApiRoutes(app);

    const port = process.env.port || 3333;
    const server = app.listen(port, () => {
      Logger.info(`API Listening at http://localhost:${port}/api`);
      app.use('/colyseus', createGameServer(server));
      Logger.info(`Game Server Listening at ws://localhost:${port}`);
      // seedUsers();
    });

    server.on('error', Logger.error);
  } catch (err) {
    Logger.error(err);
  }
}

boot().then(() => {});

function setupBaseMiddleware(app: express.Application) {
  setupServerLogging(app);
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(fileUpload());
}

function setupApiRoutes(app: express.Application) {
  app.use(
    '/api',
    new RateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000 // limit each IP to 100 requests per windowMs
    })
  );
  const auth = createAuthMiddleware();
  app.use('/api/secure', controllers.AuthController);
  app.use('/api/users', auth, isAdmin, controllers.UsersController);
  app.use('/api/words', auth, isSupervizor, controllers.WordsController);
  app.use(
    '/api/spojnica-game',
    auth,
    isSupervizor,
    controllers.SpojnicaGameController
  );
  app.use(
    '/api/asocijacija-game',
    auth,
    isSupervizor,
    controllers.AsocijacijaGameController
  );

  app.use(interceptAuthError);
}
