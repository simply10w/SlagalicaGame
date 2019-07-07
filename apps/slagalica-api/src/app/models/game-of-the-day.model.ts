import { model, Schema, Document, Error } from 'mongoose';
import moment from 'moment';
import { GameOfTheDay as IGameOfTheDay } from '@slagalica/data';

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

GameOfTheDaySchema.pre('save', function(this: GameOfTheDay, next) {
  const game = this;

  const date = moment(game.date);
  const start = date.startOf('day');
  const end = date.endOf('day');
  const condition = { date: { $gte: start.format(), $lt: end.format() } };

  GameOfTheDayModel.find(condition)
    .exec()
    .then(games => {
      if (games.length > 0) {
        const error = new Error.ValidationError();
        error.message = 'Game is already defined for this day.';
        next(error);
      } else {
        next();
      }
    });
});

export function createGameOfTheDay(game: IGameOfTheDay) {
  return new GameOfTheDayModel(game).save();
}

export const GameOfTheDayModel = model('game_of_the_day', GameOfTheDaySchema);
