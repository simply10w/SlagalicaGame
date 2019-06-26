import * as moment from 'moment';
import chalk from 'chalk';

const logFactory = color => (...messages: any[]) => {
  const now = moment().format('HH:mm:ss');
  console.log(chalk.gray(`[${now}]: `), color(messages));
};

const logSuccess = logFactory(chalk.green);
const logInfo = logFactory(chalk.blue);
const logError = logFactory(chalk.red);
const logWarning = logFactory(chalk.yellow);

export const Logger = {
  logSuccess,
  logInfo,
  logError,
  logWarning
};
