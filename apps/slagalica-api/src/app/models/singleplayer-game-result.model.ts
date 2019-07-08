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
  const start = moment()
    .startOf('day')
    .toDate();
  const end = moment()
    .endOf('day')
    .toDate();
  return { $gte: start, $lt: end };
}

export const SingeplayerGameResultModel = model<SingleplayerGameResult>(
  'singleplayer_game_results',
  SingeplayerGameResultSchema
);

export async function createSingleplayerGameResult(game: ISingleplayerGame) {
  return new SingeplayerGameResultModel(game).save();
}

export async function getTopSingleplayerResults(
  { cursor, limit }: { cursor: number; limit: number } = {
    cursor: 0,
    limit: 10
  }
) {
  return SingeplayerGameResultModel.find(
    {
      played_at: getTodaysDateCondition()
    },
    [],
    {
      skip: cursor,
      limit: limit,
      sort: {
        points: -1 // Sort DESC
      }
    }
  )
    .populate('player')
    .exec();
}
