import { ArraySchema } from '@colyseus/schema';
import { getRandomNumber } from '@slagalica/common';
import { GameWinner } from '@slagalica/data';
import { Schema, type } from 'colyseus.js';
import * as math from 'mathjs';
import { Dictionary, isNumber } from 'lodash';

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
    this.options = new ArraySchema(...this._getOptions());
    this.goal = this._getGoal();
  }

  async calculateWinner() {
    evalPlayer(this.blue, this.options);
    evalPlayer(this.red, this.options);

    /**
     * If both have valid results
     */
    if (isNumber(this.blue.result) && isNumber(this.red.result)) {
      const blueDiff = numberDiff(this.goal, this.blue.result);
      const redDiff = numberDiff(this.goal, this.red.result);

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

  private _getOptions() {
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

  private _getGoal() {
    return getRandomNumber({ min: 1, max: 999 });
  }
}

function numberDiff(number1: number, number2: number) {
  return math.abs(math.abs(number1) - math.abs(number2));
}

function evalPlayer(player: MojBrojPlayer, options: number[]) {
  if (player.formula) {
    try {
      validate(math.parse(player.formula), generateNumbersTable(options));
      const result = math.eval(player.formula);

      if (isWholeNumber(result)) player.result = result;
      else player.error = `Result is not a whole number: ${result}`;
    } catch (error) {
      console.log(error, error.message);

      player.error =
        error instanceof MojBrojValidationError
          ? error.message
          : 'Formula is invalid';
    }
  } else {
    player.error = 'No formula provided.';
  }
}

function isWholeNumber(number: number) {
  return number - math.floor(number) === 0;
}

function generateNumbersTable(numbers: number[]) {
  return numbers.reduce((table, number) => {
    table[number] = table[number] ? table[number] + 1 : 1;
    return table;
  }, {});
}

class MojBrojValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function validate(node: math.MathNode, table: Dictionary<number>) {
  const allowedOperators = new Set(['*', '+', '-', '/']);
  node.forEach(child => {
    switch (child.type) {
      case 'OperatorNode':
        if (!allowedOperators.has(child.op)) {
          throw new MojBrojValidationError(`Invalid operation ${child.op}`);
        }
        validate(child, table);
        break;
      case 'ConstantNode':
        const num = child.value;
        if (num in table) {
          --table[num];
          if (table[num] < 0) {
            throw new MojBrojValidationError(
              `Number ${num} used more then allowed`
            );
          }
        } else {
          throw new MojBrojValidationError(`Number ${num} not allowed`);
        }
        break;
      case 'SymbolNode':
        throw new MojBrojValidationError(`Formula invalid`);
    }
  });
}
