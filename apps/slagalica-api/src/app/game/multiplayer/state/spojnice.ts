import { Schema, type } from 'colyseus.js';
import { SpojnicaGame, SpojniceStates, PlayerRole } from '@slagalica/data';
import {
  getOneRandomCollectionItem,
  emptyArraySchema,
  Logger
} from '@slagalica-api/util';
import { SpojnicaGameModel } from '@slagalica-api/models';
import { ArraySchema } from '@colyseus/schema';
import { shuffle } from 'lodash';

class SpojnicaPlayer extends Schema {
  @type('number')
  points: number = 0;
}

class SpojnicaConnection extends Schema {
  @type('number')
  from: number;

  @type('number')
  to: number;

  @type('string')
  by: PlayerRole;
}

export class SpojniceGameState extends Schema {
  game: SpojnicaGame;

  @type(SpojnicaPlayer)
  red = new SpojnicaPlayer();

  @type(SpojnicaPlayer)
  blue = new SpojnicaPlayer();

  @type('string')
  state: SpojniceStates;

  @type('number')
  currentIndex = 0;

  @type(['string'])
  leftSide = new ArraySchema<string>();

  @type(['string'])
  rightSide = new ArraySchema<string>();

  @type([SpojnicaConnection])
  connections = new ArraySchema<SpojnicaConnection>();

  @type('number')
  gameNumber = 0;

  private _onRestart: Function = () => {};

  async initGame() {
    await this._init();
    this.state = SpojniceStates.BluePlaying;
  }

  async startSecondGame() {
    await this._init();
    this._onRestart();
    this.state = SpojniceStates.RedPlaying;
  }

  getGame() {
    return getOneRandomCollectionItem(SpojnicaGameModel);
  }

  endGame() {
    this.state = SpojniceStates.Finished;
  }

  guess(player: PlayerRole, guess: string) {
    if (
      this._isNotOkayToGuess() ||
      !this._isPlayersTurn(player) ||
      !this.rightSide.includes(guess)
    )
      return;

    const current = this.leftSide[this.currentIndex];
    const pairWithSolution = this.game.pairs.find(
      pair => pair.left === current
    );

    if (pairWithSolution.right === guess) {
      this._addPointsToCurrentPlayer();
      const connection = new SpojnicaConnection();
      connection.from = this.currentIndex;
      connection.to = this.rightSide.findIndex(item => item === guess);
      connection.by = player;
      this.connections.push(connection);
    }

    this._updateIndex();
  }

  endTime() {
    this._nextState();
  }

  onRestart(callback: Function) {
    this._onRestart = callback;
  }

  private _addPointsToCurrentPlayer() {
    const points = 1;
    const player = this._getCurrentPlayer();
    if (player) player.points += points;
  }

  private async _init() {
    this.game = await this.getGame();
    this._initSides();
    emptyArraySchema(this.connections);
    this.currentIndex = 0;
    this.gameNumber++;
  }

  private _updateIndex() {
    const solvedIndexes = new Set(this.connections.map(conn => conn.from));
    this.currentIndex++;
    while (solvedIndexes.has(this.currentIndex)) this.currentIndex++;

    if (this.currentIndex >= 10) {
      this._nextState();
    }
  }

  private _nextState() {
    switch (this.state) {
      case SpojniceStates.RedPlaying:
      case SpojniceStates.BluePlaying:
        if (this.connections.length === 10) {
          this._goToEndOrNextGame();
        } else {
          this._goToPlayerStrikeOutState();
        }
        this.currentIndex = 0;
        break;
      case SpojniceStates.RedStrikeOutBluePlaying:
      case SpojniceStates.BlueStrikeOutRedPlaying:
        this._goToEndOrNextGame();
        this.currentIndex = 0;
        break;
    }
  }

  private _goToEndOrNextGame() {
    switch (this.state) {
      case SpojniceStates.BluePlaying:
      case SpojniceStates.BlueStrikeOutRedPlaying:
        this.startSecondGame().then(() => {});
        break;

      case SpojniceStates.RedPlaying:
      case SpojniceStates.RedStrikeOutBluePlaying:
        this.state = SpojniceStates.Finished;
        break;
    }
  }

  private _goToPlayerStrikeOutState() {
    switch (this.state) {
      case SpojniceStates.BluePlaying:
        this._onRestart();
        this.state = SpojniceStates.BlueStrikeOutRedPlaying;
        break;

      case SpojniceStates.RedPlaying:
        this._onRestart();
        this.state = SpojniceStates.RedStrikeOutBluePlaying;
        break;
    }
  }

  private _getCurrentPlayer() {
    switch (this.state) {
      case SpojniceStates.RedStrikeOutBluePlaying:
      case SpojniceStates.BluePlaying:
        return this.blue;
      case SpojniceStates.BlueStrikeOutRedPlaying:
      case SpojniceStates.RedPlaying:
        return this.red;
    }
  }

  private _isPlayersTurn(player: PlayerRole) {
    switch (this.state) {
      case SpojniceStates.RedStrikeOutBluePlaying:
      case SpojniceStates.BluePlaying:
        return player === PlayerRole.Blue;
      case SpojniceStates.BlueStrikeOutRedPlaying:
      case SpojniceStates.RedPlaying:
        return player === PlayerRole.Red;
    }

    return false;
  }

  private _isNotOkayToGuess() {
    return (
      this.state === SpojniceStates.Finished ||
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
