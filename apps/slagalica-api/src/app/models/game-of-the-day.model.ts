import { model, Schema, Document, Error } from 'mongoose';
import moment from 'moment';
import { GameOfTheDay as IGameOfTheDay } from '@slagalica/data';
import { getOneRandomCollectionItem, Logger } from '@slagalica-api/util';
import { SpojnicaGameModel } from './spojnica-game.model';
import { AsocijacijaGameModel } from './asocijacija-game.model';

type GameOfTheDay = IGameOfTheDay & Document;

export const GameOfTheDaySchema = new Schema({
  spojnica: { type: Schema.Types.ObjectId, ref: 'spojnicaGames' },
  asocijacija: { type: Schema.Types.ObjectId, ref: 'asocijacija_games' },
  date: {
    type: Date,
    default: moment()
      .startOf('day')
      .format(),
    required: [true, 'Date required.']
  }
});

GameOfTheDaySchema.pre('save', async function(this: GameOfTheDay, next) {
  const game = this;

  const date = moment(game.date);
  const start = date.startOf('day');
  const end = date.endOf('day');
  const condition = { date: { $gte: start.toDate(), $lt: end.toDate() } };
  const games = await GameOfTheDayModel.find(condition).exec();

  if (games.length > 0) {
    const error = new Error.ValidationError();
    error.message = 'Game is already defined for this day.';
    next(error);
  } else {
    next();
  }
});

export function createGameOfTheDay(game: IGameOfTheDay) {
  return new GameOfTheDayModel(game).save();
}

export const GameOfTheDayModel = model<GameOfTheDay>(
  'game_of_the_day',
  GameOfTheDaySchema
);

export async function getGameOfTheDay() {
  const game = await getOneRandomCollectionItem(GameOfTheDayModel);

  const [spojnica, asocijacija] = await Promise.all([
    SpojnicaGameModel.findById(game.spojnica).exec(),
    AsocijacijaGameModel.findById(game.asocijacija).exec()
  ]);

  if (!spojnica || !asocijacija) {
    const error = new Error.ValidationError();
    Logger.error('Missing asocijacija or spojnica for the game of the day');
    error.message = 'Server error.';
    throw error;
  }

  return {
    _id: game._id,
    date: game.date,
    asocijacija,
    spojnica
  };
}
