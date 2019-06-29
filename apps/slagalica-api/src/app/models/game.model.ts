import { model, Schema, Document, Error } from 'mongoose';
import {
  TwoPeopleGame as _TwoPeopleGame,
  OnePersonGame as _OnePersonGame,
  PlayerRole
} from '@slagalica/data';
import moment from 'moment';

type TwoPeopleGame = _TwoPeopleGame & Document;
type OnePersonGame = _OnePersonGame & Document;

const RoleSchemaSettings = {
  player: {
    type: String,
    required: [true, 'Player is required.']
  },
  points: {
    type: Number,
    required: [true, 'Points won by player are required.']
  }
};

const _twoPeopleRoleSchema = new Schema(RoleSchemaSettings);
export const TwoPeopleGameSchema = new Schema({
  red: {
    type: _twoPeopleRoleSchema,
    required: [true, 'Red player is required.']
  },
  blue: {
    type: _twoPeopleRoleSchema,
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

export const TwoPeopleGameModel = model<TwoPeopleGame>(
  'two_people_games',
  TwoPeopleGameSchema
);

export async function getAllTwoPeopleGamesPlayed() {
  const populateQuery = [
    { path: 'red', select: 'player points' },
    { path: 'blue', select: 'player points' }
  ];

  return TwoPeopleGameModel.find().populate(populateQuery);
}

export async function createTwoPeopleGame(game: _TwoPeopleGame) {
  return new TwoPeopleGameModel(game).save();
}

export async function getAllUserTwoPeopleGames(userId: string) {
  return TwoPeopleGameModel.find({ 'red.player': userId })
    .find({
      'blue.player': userId
    })
    .exec();
}

export const OnePersonGameSchema = new Schema({
  ...RoleSchemaSettings,
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

export const OnePersonGameModel = model<OnePersonGame>(
  'one_person_games',
  OnePersonGameSchema
);

export async function createOnePersonGame(game: _OnePersonGame) {
  const userPlayedGame = await OnePersonGameModel.find({
    player: game.player,
    played_at: getTodaysDateCondition()
  });

  if (userPlayedGame) {
    const error = new Error.ValidationError();
    error.message = 'User has already played todays game.';
    throw error;
  }

  return new OnePersonGameModel(game).save();
}

export async function getTodaysGames(
  { cursor, limit }: { cursor: number; limit: number } = {
    cursor: 0,
    limit: 10
  }
) {
  return OnePersonGameModel.find({
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

export async function getAllUserOnePersonGames(userId: string) {
  return OnePersonGameModel.find({ player: userId })
    .find({
      player: userId
    })
    .exec();
}
