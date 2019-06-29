import { model, Schema, Document } from 'mongoose';
import { Game as _Game, PlayerRole } from '@slagalica/data';
import moment from 'moment';

type Game = _Game & Document;

const RoleSchema = new Schema({
  player: {
    type: String,
    required: [true, 'Player is required.']
  },
  points: {
    type: Number,
    required: [true, 'Points won by player are required.']
  }
});

export const GameSchema = new Schema({
  red: {
    type: RoleSchema,
    required: [true, 'Red player is required.']
  },
  blue: {
    type: RoleSchema,
    required: [true, 'Blue player is required.']
  },
  won: {
    type: String,
    enum: [PlayerRole.Red, PlayerRole.Blue]
  },
  played_at: {
    type: Date,
    default: moment().format()
  }
});

export const GameModel = model<Game>('games', GameSchema);

export async function getAllGames() {
  const populateQuery = [
    { path: 'red', select: 'player points' },
    { path: 'blue', select: 'player points' }
  ];

  return GameModel.find().populate(populateQuery);
}

export async function createGame(game: _Game) {
  return new GameModel(game).save();
}

export async function getAllUserGames(userId: string) {
  return GameModel.find({ 'red.player': userId })
    .find({
      'blue.played': userId
    })
    .exec();
}
