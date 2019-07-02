import { type, Schema } from 'colyseus.js';
import * as math from 'mathjs';
import { getRandomNumber } from '@slagalica/common';
import { ArraySchema } from '@colyseus/schema';

class MojBrojTry extends Schema {
  @type('string')
  formula: string;

  @type('number')
  result: number;
}

export class MojBrojGameState extends Schema {
  @type(['number'])
  options = new ArraySchema<number>();

  @type('number')
  goal: number;

  @type(MojBrojTry)
  redPlayerTry: MojBrojTry = new MojBrojTry();

  @type(MojBrojTry)
  bluePlayerTry: MojBrojTry = new MojBrojTry();

  constructor() {
    super();
  }

  getWinner() {
    this.redPlayerTry.result = math.eval(this.redPlayerTry.formula);
    this.bluePlayerTry.result = math.eval(this.bluePlayerTry.formula);

    console.log(this.redPlayerTry.result, this.redPlayerTry.formula);
    console.log(this.bluePlayerTry.result, this.bluePlayerTry.formula);
  }

  async initGame() {
    this.options = this.getOptions() as any;
    this.goal = this.getGoal();
  }

  getOptions() {
    const numbers: number[] = [];
    for (let i = 0; i < 4; i++) {
      numbers.push(getRandomNumber({ min: 1, max: 9 }));
    }

    const midTier = [10, 15, 20];
    numbers.push(midTier[getRandomNumber({ min: 0, max: midTier.length - 1 })]);

    const highTier = [25, 50, 75, 100];
    numbers.push(
      highTier[getRandomNumber({ min: 0, max: highTier.length - 1 })]
    );
    return numbers;
  }

  getGoal() {
    return getRandomNumber({ min: 1, max: 999 });
  }
}
