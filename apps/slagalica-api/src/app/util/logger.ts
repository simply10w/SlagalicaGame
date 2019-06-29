import moment from 'moment';
import chalk from 'chalk';
import { Application } from 'express';
import morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import winston, { createLogger, format, transports } from 'winston';

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
const LOGS_PATH = path.join(__dirname, 'logs');

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const Logger = createLogger({
  format: format.combine(format.colorize(), format.timestamp(), myFormat),
  transports: [new transports.Console()]
});

if (process.env.NODE_ENV === 'production') {
  Logger.add(
    new winston.transports.File({
      filename: path.join(LOGS_PATH, 'error.log'),
      level: 'error'
    })
  );
  Logger.add(
    new winston.transports.File({
      filename: path.join(LOGS_PATH, 'combined.log')
    })
  );
}

// const logFactory = color => (...messages: any[]) => {
//   const now = moment().format('HH:mm:ss');
//   console.log(chalk.gray(`[${now}]: `), color(messages));
// };

// const logSuccess = () => logFactory(chalk.green);
// const logInfo = logFactory(chalk.blue);
// const logError = logFactory(chalk.red);
// const logWarning = logFactory(chalk.yellow);

// export const Logger = {
//   logSuccess,
//   logInfo,
//   logError,
//   logWarning
// };

export function setupServerLogging(app: Application) {
  // log only 4xx and 5xx responses to console
  app.use(
    morgan('dev', {
      skip: function(req, res) {
        return res.statusCode < 400;
      }
    })
  );

  // log all requests to access.log
  app.use(
    morgan('common', {
      stream: fs.createWriteStream(path.join(LOGS_PATH, 'requests.log'), {
        flags: 'a'
      })
    })
  );
}
