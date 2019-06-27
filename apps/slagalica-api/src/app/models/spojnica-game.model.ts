import { model, Schema, Document, Error } from 'mongoose';
import {
  SpojnicaGame as _SpojnicaGame,
  SpojnicaPair as _SpojnicaPair
} from '@slagalica/data';

type SpojnicaGame = _SpojnicaGame & Document;
type SpojnicaPair = _SpojnicaPair & Document;

const SpojnicaPairSchema = new Schema<SpojnicaPair>({
  left: {
    type: String,
    required: true
  },
  right: {
    type: String,
    required: true
  }
});

const SpojnicaGameSchema = new Schema<SpojnicaGame>({
  description: {
    type: String,
    required: true
  },
  pairs: [SpojnicaPairSchema]
});

SpojnicaGameSchema.pre('save', function(this: SpojnicaGame, next) {
  if (this.pairs.length !== 10) {
    const error = new Error.ValidationError(this);
    error.errors.pairs = new Error.ValidatorError({
      message: 'Must have 10 pairs',
      path: 'pairs',
      value: this.pairs
    });
    return next(error);
  }

  next();
});

const SpojnicaPairModel = model<SpojnicaPair>('pairs', SpojnicaPairSchema);
const SpojnicaGameModel = model<SpojnicaGame>(
  'spojnicaGames',
  SpojnicaGameSchema
);
export { SpojnicaGameModel, SpojnicaPairModel };
