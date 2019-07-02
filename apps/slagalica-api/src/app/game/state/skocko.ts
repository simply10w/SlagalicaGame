import { Schema, type } from 'colyseus.js';
import { ArraySchema } from '@colyseus/schema';

class SkockoGameTry extends Schema {
  @type(['string'])
  sequence: ArraySchema<string>;
}

export class SkockoGameState extends Schema {
  @type([SkockoGameTry])
  redPlayerTries = new ArraySchema<SkockoGameTry>();

  @type([SkockoGameTry])
  bluePlayerTries = new ArraySchema<SkockoGameTry>();

  goal: string[];

  constructor() {
    super();
  }

  async initGame() {}

  getGoal() {}
}
