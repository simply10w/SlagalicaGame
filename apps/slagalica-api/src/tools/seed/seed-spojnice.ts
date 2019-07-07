import { SpojnicaGameModel } from '@slagalica-api/models';
import { Logger } from '@slagalica-api/util';
import * as fs from 'fs';
import * as path from 'path';
import { SEED_FILES_PATH } from './path';

export function seedSpojnice() {
  const FILE = path.resolve(SEED_FILES_PATH, 'spojnice.json');
  Promise.resolve(null)
    .then(() => fs.readFileSync(FILE, { encoding: 'utf-8' }))
    .then(json => JSON.parse(json))
    .then(games =>
      SpojnicaGameModel.remove({}).then(() =>
        SpojnicaGameModel.insertMany(games)
      )
    )
    .then(() => {
      Logger.info('SUCCESSFULLY ADDED SPOJNICE GAMES');
    })
    .catch(error => Logger.error('Something went wrong.', error));
}
