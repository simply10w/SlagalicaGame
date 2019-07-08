import { model, Schema, Document, Error } from 'mongoose';
import { SingleplayerGame as ISingleplayerGame } from '@slagalica/data';
import moment from 'moment';

type SingleplayerGameResult = ISingleplayerGame & Document;

export const SingeplayerGameResultSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'Player is required.']
  },
  points: {
    type: Number,
    required: [true, 'Points won by player are required.']
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'game_of_the_day',
    required: [true, 'Game which was played is required.']
  },
  played_at: {
    type: Date,
    default: moment().format()
  }
});

function getTodaysDateCondition() {
  const start = moment().startOf('day');
  const end = moment().endOf('day');
  return { $gte: start.format(), $lt: end.format() };
}

export const SingeplayerGameResultModel = model<SingleplayerGameResult>(
  'singleplayer_game_results',
  SingeplayerGameResultSchema
);

export async function createSingleplayerGame(game: ISingleplayerGame) {
  const userPlayedGame = await SingeplayerGameResultModel.find({
    player: game.player,
    played_at: getTodaysDateCondition()
  });

  if (userPlayedGame) {
    const error = new Error.ValidationError();
    error.message = 'User has already played todays game.';
    throw error;
  }

  return new SingeplayerGameResultModel(game).save();
}

export async function getTodaysGames(
  { cursor, limit }: { cursor: number; limit: number } = {
    cursor: 0,
    limit: 10
  }
) {
  return SingeplayerGameResultModel.find({
    played_at: getTodaysDateCondition()
  })
    .sort({
      skip: cursor,
      limit: limit,
      sort: {
        points: -1 // Sort DESC
      }
    })
    .exec();
}

export async function getAllUserSingleplayerGameResults(userId: string) {
  return SingeplayerGameResultModel.find({ player: userId })
    .find({
      player: userId
    })
    .exec();
}