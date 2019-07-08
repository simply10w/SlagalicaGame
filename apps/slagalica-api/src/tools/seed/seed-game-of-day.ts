import {
  AsocijacijaGameModel,
  createGameOfTheDay,
  SpojnicaGameModel
} from '@slagalica-api/models';
import { getOneRandomCollectionItem } from '@slagalica-api/util';
import { times } from 'lodash';
import moment from 'moment';

export function seedGameOfDay() {
  times(3).forEach(async () => {
    const [asoc, spoj] = await Promise.all([
      getOneRandomCollectionItem(AsocijacijaGameModel),
      getOneRandomCollectionItem(SpojnicaGameModel)
    ]);

    await createGameOfTheDay({
      asocijacija: asoc._id,
      spojnica: spoj._id,
      date: moment().format()
    });
  });
}
