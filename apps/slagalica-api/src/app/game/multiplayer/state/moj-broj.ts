import { ArraySchema } from '@colyseus/schema';
import { MojBrojGame } from '@slagalica-api/game/shared';
import { GameWinner } from '@slagalica/data';
import { Schema, type } from 'colyseus.js';
import { isNumber } from 'lodash';

class MojBrojPlayer extends Schema {
  @type('string')
  formula: string;

  @type('number')
  result: number;

  @type('string')
  error: string;

  @type('number')
  points = 0;
}

const WINNER_POINTS = 10;
const TIE_POINTS = 5;

export class MojBrojGameState extends Schema {
  @type(['number'])
  options = new ArraySchema<number>();

  @type('number')
  goal: number;

  @type(MojBrojPlayer)
  red: MojBrojPlayer = new MojBrojPlayer();

  @type(MojBrojPlayer)
  blue: MojBrojPlayer = new MojBrojPlayer();

  @type('string')
  winner: GameWinner;

  constructor() {
    super();
  }

  async initGame() {
    this.options = new ArraySchema(...MojBrojGame.getOptions());
    this.goal = MojBrojGame.getGoal();
  }

  async calculateWinner() {
    MojBrojGame.evalPlayer(this.blue, this.options);
    MojBrojGame.evalPlayer(this.red, this.options);

    /**
     * If both have valid results
     */
    if (isNumber(this.blue.result) && isNumber(this.red.result)) {
      const blueDiff = MojBrojGame.numberDiff(this.goal, this.blue.result);
      const redDiff = MojBrojGame.numberDiff(this.goal, this.red.result);

      /**
       * if blue has number closer to the goal
       */
      if (blueDiff < redDiff) {
        this.winner = GameWinner.Blue;
        this.blue.points = WINNER_POINTS;
        /**
         * if red has number closer to the goal
         */
      } else if (blueDiff > redDiff) {
        this.winner = GameWinner.Red;
        this.red.points = WINNER_POINTS;
        /**
         * if both have the same number
         */
      } else {
        this.winner = GameWinner.Both;
        this.red.points = TIE_POINTS;
        this.blue.points = TIE_POINTS;
      }
      /**
       * If only blue has valid result
       */
    } else if (isNumber(this.blue.result)) {
      this.winner = GameWinner.Blue;
      this.blue.points = WINNER_POINTS;
      /**
       * If only red has valid result
       */
    } else if (isNumber(this.red.result)) {
      this.winner = GameWinner.Red;
      this.red.points = WINNER_POINTS;
      /**
       * If both have invalid results
       */
    } else {
      this.winner = GameWinner.None;
    }
  }
}
