import { ArraySchema } from '@colyseus/schema';
import { SkockoGame } from '@slagalica-api/game/shared';
import { Skocko, SkockoPositionResult } from '@slagalica/data';
import { Schema, type } from 'colyseus.js';

class SkockoTry extends Schema {
  @type(['string'])
  try = new ArraySchema<Skocko>();

  @type(['string'])
  result = new ArraySchema<SkockoPositionResult>();
}

export class SkockoGameState extends Schema {
  @type([SkockoTry])
  tries = new ArraySchema<SkockoTry>();

  @type('number')
  points = 0;

  goal: Skocko[] = [];

  @type('boolean')
  gameEnded: boolean;

  async initGame() {
    this.goal = SkockoGame.getGoal();
  }

  /**
   *
   * @returns whetever the game is finished
   */
  check(sequence: Skocko[]): boolean {
    if (this.tries.length >= 6) return;

    const results = SkockoGame.getPositionResults(this.goal, sequence);
    const skockoTry = new SkockoTry();
    skockoTry.try = new ArraySchema(...sequence);
    skockoTry.result = new ArraySchema(...results);
    this.tries.push(skockoTry);

    if (SkockoGame.hasGotItRight(this)) {
      this.points = SkockoGame.WINNER_POINTS;
      this.gameEnded = true;
    } else if (this.tries.length >= 6) {
      this.gameEnded = true;
    }

    return this.gameEnded === true;
  }
}
