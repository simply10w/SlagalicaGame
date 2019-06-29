import express from 'express';
import { connect } from 'mongoose';
import * as bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import RateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import jwt from 'express-jwt';
import { environment } from './environments/environment.prod';
import * as controllers from '@slagalica-api/controllers';
import { Logger, setupServerLogging } from '@slagalica-api/util';
import * as StatusCodes from 'http-status-codes';
import { seedUsers } from './tools/seed-users';
import { createGameEngine } from '@slagalica-api/game-engine';
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
      app.use('/colyseus', createGameEngine(server));
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
  app.use('/secure', controllers.AuthController);
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

// {
//   "sub": "1234567890",
//   "username": "admin",
//   "type": "admin",
//   "iat": 1516239022,
//   "iss": "slagalica/api",
//   "aud": "slagalica"
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJhZG1pbiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoic2xhZ2FsaWNhL2FwaSIsImF1ZCI6InNsYWdhbGljYSJ9.03Ctq29FGtx0M0v4hooINCxxHHYsbtw4mkZlELyUF2M
