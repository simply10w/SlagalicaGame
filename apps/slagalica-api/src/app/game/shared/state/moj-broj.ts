import { getRandomNumber } from '@slagalica/common';
import * as math from 'mathjs';
import { Dictionary } from 'lodash';

export function getOptions() {
  const numbers: number[] = [];
  for (let i = 0; i < 4; i++) {
    numbers.push(getRandomNumber({ min: 1, max: 9 }));
  }

  const midTier = [10, 15, 20];
  numbers.push(midTier[getRandomNumber({ min: 0, max: midTier.length - 1 })]);

  const highTier = [25, 50, 75, 100];
  numbers.push(highTier[getRandomNumber({ min: 0, max: highTier.length - 1 })]);
  return numbers;
}

export function getGoal() {
  return getRandomNumber({ min: 1, max: 999 });
}

export function numberDiff(number1: number, number2: number) {
  return math.abs(math.abs(number1) - math.abs(number2));
}

export function evalPlayer(
  player: { formula: string; result: number; error: string },
  options: number[]
) {
  if (player.formula) {
    try {
      validate(math.parse(player.formula), generateNumbersTable(options));
      const result = math.eval(player.formula);

      if (isWholeNumber(result)) player.result = result;
      else player.error = `Result is not a whole number: ${result}`;
    } catch (error) {
      player.error =
        error instanceof MojBrojValidationError
          ? error.message
          : 'Formula is invalid';
    }
  } else {
    player.error = 'No formula provided.';
  }
}

export function isWholeNumber(number: number) {
  return number - math.floor(number) === 0;
}

export function generateNumbersTable(numbers: number[]) {
  return numbers.reduce((table, number) => {
    table[number] = table[number] ? table[number] + 1 : 1;
    return table;
  }, {});
}

export class MojBrojValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function validate(node: math.MathNode, table: Dictionary<number>) {
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
