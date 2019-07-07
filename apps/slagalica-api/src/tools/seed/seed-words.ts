import { WordModel } from '@slagalica-api/models';
import { Logger } from '@slagalica-api/util';
import * as fs from 'fs';
import * as path from 'path';
import { SEED_FILES_PATH } from './path';

export function seedWords() {
  const FILE = path.resolve(SEED_FILES_PATH, 'reci.json');
  Promise.resolve(null)
    .then(() => fs.readFileSync(FILE, { encoding: 'utf-8' }))
    .then(json => JSON.parse(json))
    .then(words => WordModel.remove({}).then(() => WordModel.insertMany(words)))
    .then(() => {
      Logger.info('SUCCESSFULLY ADDED WORDS');
    })
    .catch(error => Logger.error('Something went wrong.', error));
}
