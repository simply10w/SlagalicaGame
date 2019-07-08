import { model, Schema, Document } from 'mongoose';
import {
  MultiplayerGame as IMultiplayerGame,
  PlayerRole
} from '@slagalica/data';
import moment from 'moment';

type MultiplayerGameResult = IMultiplayerGame & Document;

export const MultiplayerGameResultSchema = new Schema({
  red: { type: Schema.Types.ObjectId, ref: 'users' },
  blue: { type: Schema.Types.ObjectId, ref: 'users' },
  redPoints: Number,
  bluePoints: Number,
  won: {
    type: String,
    enum: [PlayerRole.Red, PlayerRole.Blue]
  },
  played_at: {
    type: Date,
    default: moment().format()
  }
});

export const MultiplayerGameResultModel = model<MultiplayerGameResult>(
  'multiplayer_game_results',
  MultiplayerGameResultSchema
);

export async function getAllMultiplayerGameResults() {
  return MultiplayerGameResultModel.find({}).populate(
    'red',
    'userName',
    'users'
  );
}

export async function createMultiplayerGameResult(game: IMultiplayerGame) {
  return new MultiplayerGameResultModel(game).save();
}

function getLast10DaysCondition() {
  const start = moment()
    .startOf('day')
    .subtract(10, 'days')
    .toDate();
  const end = moment()
    .endOf('day')
    .toDate();
  return { $gte: start, $lt: end };
}

export async function getAllUserMultiplayerGameResults(userId: string) {
  return MultiplayerGameResultModel.find({
    $and: [
      { $or: [{ red: userId }, { blue: userId }] },
      { played_at: getLast10DaysCondition() }
    ]
  })
    .populate('red')
    .populate('blue')
    .exec();
}
