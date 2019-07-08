import { ArraySchema } from '@colyseus/schema';
import { emptyArraySchema } from '@slagalica-api/util';
import { SpojnicaGame } from '@slagalica/data';
import { Schema, type } from 'colyseus.js';
import { shuffle } from 'lodash';

class SpojnicaConnection extends Schema {
  @type('number')
  from: number;

  @type('number')
  to: number;
}

export class SpojniceGameState extends Schema {
  game: SpojnicaGame;

  @type('number')
  points: number = 0;

  @type('number')
  currentIndex = 0;

  @type(['string'])
  leftSide = new ArraySchema<string>();

  @type(['string'])
  rightSide = new ArraySchema<string>();

  @type([SpojnicaConnection])
  connections = new ArraySchema<SpojnicaConnection>();

  @type('boolean')
  finished: boolean = false;

  async initGame(game: SpojnicaGame) {
    this.game = game;
    this._initSides();
    emptyArraySchema(this.connections);
    this.currentIndex = 0;
  }

  guess(guess: string) {
    if (this._isNotOkayToGuess() || !this.rightSide.includes(guess)) return;

    const current = this.leftSide[this.currentIndex];
    const pairWithSolution = this.game.pairs.find(
      pair => pair.left === current
    );

    if (pairWithSolution.right === guess) {
      this._addPoints();
      const connection = new SpojnicaConnection();
      connection.from = this.currentIndex;
      connection.to = this.rightSide.findIndex(item => item === guess);
      this.connections.push(connection);
    }

    this._updateIndex();
  }

  private _addPoints() {
    const points = 1;
    this.points += points;
  }

  private _updateIndex() {
    this.currentIndex++;
    if (this.currentIndex >= 10) {
      this.finished = true;
    }
  }

  private _isNotOkayToGuess() {
    return (
      this.finished ||
      this.connections.find(connection => connection.from === this.currentIndex)
    );
  }

  private _initSides() {
    let left = [];
    let right = [];
    this.game.pairs.forEach(pair => {
      left.push(pair.left);
      right.push(pair.right);
    });
    left = shuffle(left);
    right = shuffle(right);

    this.leftSide = new ArraySchema(...left);
    this.rightSide = new ArraySchema(...right);
  }
}
