import { model, Schema, Document, Error } from 'mongoose';
import {
  AsocijacijaGame as _AsocijacijaGame,
  AsocijacijaGroup as _AsocijacijaGroup
} from '@slagalica/data';

type AsocijacijaGame = _AsocijacijaGame & Document;
type AsocijacijaGroup = _AsocijacijaGroup & Document;

const AsocijacijaGroupSchema = new Schema({
  hints: {
    type: [String],
    required: true
  },
  solutions: {
    type: [String],
    required: true
  }
});

AsocijacijaGroupSchema.pre('save', function(this: AsocijacijaGroup, next) {
  if (this.solutions.length === 0) {
    const error = new Error.ValidationError(this);
    error.errors.pairs = new Error.ValidatorError({
      message: 'Must have at least one solution',
      path: 'solutions',
      value: this.solutions
    });
    return next(error);
  }

  if (this.hints.length !== 4) {
    const error = new Error.ValidationError(this);
    error.errors.pairs = new Error.ValidatorError({
      message: 'Must have 4 hints',
      path: 'hints',
      value: this.hints
    });
    return next(error);
  }

  next();
});

const AsocijacijaGameSchema = new Schema<AsocijacijaGame>({
  solutions: {
    type: [String],
    required: true
  },
  groups: {
    type: [AsocijacijaGroupSchema],
    required: true
  }
});

AsocijacijaGameSchema.pre('save', function(this: AsocijacijaGame, next) {
  if (this.solutions.length === 0) {
    const error = new Error.ValidationError(this);
    error.errors.pairs = new Error.ValidatorError({
      message: 'Must have at least one solution',
      path: 'solutions',
      value: this.solutions
    });
    return next(error);
  }

  if (this.groups.length !== 4) {
    const error = new Error.ValidationError(this);
    error.errors.pairs = new Error.ValidatorError({
      message: 'Must have 4 groups',
      path: 'groups',
      value: this.groups
    });
    return next(error);
  }

  next();
});

const AsocijacijaGameModel = model<AsocijacijaGame>(
  'asocijacija_games',
  AsocijacijaGameSchema
);
export { AsocijacijaGameModel };
