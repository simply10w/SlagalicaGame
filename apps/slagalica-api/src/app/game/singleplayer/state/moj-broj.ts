import { ArraySchema } from '@colyseus/schema';
import { MojBrojGame } from '@slagalica-api/game/shared';
import { Schema, type } from 'colyseus.js';
import { isNumber } from 'lodash';

export class MojBrojGameState extends Schema {
  @type(['number'])
  options = new ArraySchema<number>();

  @type('number')
  goal: number;

  @type('string')
  formula: string;

  @type('number')
  result: number;

  @type('string')
  error: string;

  @type('number')
  points = 0;

  async initGame() {
    this.options = new ArraySchema(...MojBrojGame.getOptions());
    this.goal = MojBrojGame.getGoal();
  }

  async calculateWinner() {
    MojBrojGame.evalPlayer(this, this.options);

    if (isNumber(this.result)) {
      if (this.result === this.goal) this.points = 10;
    }
  }
}
