import { Schema, type } from 'colyseus.js';
import { ArraySchema } from '@colyseus/schema';
import { Skocko, PlayerRole } from '@slagalica/data';
import { getRandomNumber } from '@slagalica/common';
import { last } from 'lodash';

class SkockoTry extends Schema {
  @type(['string'])
  try = new ArraySchema<Skocko>();

  @type(['boolean'])
  result = new ArraySchema<boolean>();
}

class SkockoPlayer extends Schema {
  @type([SkockoTry])
  tries = new ArraySchema<SkockoTry>();

  @type('number')
  points = 0;
}

const enum GameState {
  NotStarted = 1,
  BluePlaying,
  RedPlaying,
  BlueStrikeOutRedPlaying,
  RedStrikeOutBluePlaying,
  Finished
}

const WINNER_POINTS = 10;
const NEXT_GAME_DELAY = 3 * 1000; // 3 SECONDS

export class SkockoGameState extends Schema {
  @type(SkockoPlayer)
  red = new SkockoPlayer();

  @type(SkockoPlayer)
  blue = new SkockoPlayer();

  @type('string')
  turn: PlayerRole | 'waiting_for_next_game';

  @type('string')
  winner: PlayerRole;

  goal: Skocko[] = [];

  private _gameState: GameState = GameState.NotStarted;

  constructor() {
    super();
  }

  async initGame() {
    this._goToNextGameStep();
  }

  /**
   *
   * @returns whetever the game is finished
   */
  check(player: PlayerRole, sequence: Skocko[]): boolean {
    if (this.turn !== player) return;
    const skockoPlayer: SkockoPlayer = this._getSkockoPlayer();

    if (skockoPlayer.tries.length >= 6) return;

    const result = this.goal.map(
      (goalItem, index) => sequence[index] === goalItem
    );
    const skockoTry = new SkockoTry();
    skockoTry.try = new ArraySchema(...sequence);
    skockoTry.result = new ArraySchema(...result);
    skockoPlayer.tries.push(skockoTry);

    this._goToNextGameStep();

    return this._gameState === GameState.Finished;
  }

  private _goToNextGameStep() {
    switch (this._gameState) {
      case GameState.NotStarted:
        this._gameState = GameState.BluePlaying;
        this.turn = PlayerRole.Blue;
        this.goal = getGoal();
        break;
      case GameState.BluePlaying:
        /**
         * if blue got it right
         **/
        if (hasGotItRight(this.blue)) {
          this.blue.points = WINNER_POINTS;
          this.winner = PlayerRole.Blue;
          this._startSecondGame();

          /**
           * If blue has used all his tries
           */
        } else if (usedAllTries(this.blue)) {
          this._gameState = GameState.BlueStrikeOutRedPlaying;
          this.turn = PlayerRole.Red;
        }
        break;
      case GameState.BlueStrikeOutRedPlaying:
        /**
         * if red got it right
         */
        if (hasGotItRight(this.red)) {
          this.red.points = WINNER_POINTS;
          this.winner = PlayerRole.Red;
        }
        /**
         * He has one try so nonetheless we go to next stage
         */
        this._startSecondGame();
        break;
      case GameState.RedPlaying:
        /**
         * if red got it right
         **/
        if (hasGotItRight(this.red)) {
          this.red.points = WINNER_POINTS;
          this._gameState = GameState.Finished;

          /**
           * If red has used all his tries
           */
        } else if (usedAllTries(this.red)) {
          this._gameState = GameState.RedStrikeOutBluePlaying;
          this.turn = PlayerRole.Blue;
        }
        break;
      case GameState.RedStrikeOutBluePlaying:
        /**
         * if blue got it right
         */
        if (hasGotItRight(this.blue)) {
          this.blue.points = WINNER_POINTS;
        }

        this._gameState = GameState.Finished;
        break;
    }
  }

  private _restart() {
    this.winner = null;
    this.red.tries = new ArraySchema();
    this.blue.tries = new ArraySchema();
    this.goal = getGoal();
  }

  private _getSkockoPlayer() {
    switch (this.turn) {
      case PlayerRole.Blue:
        return this.blue;
      case PlayerRole.Red:
        return this.red;
    }
  }

  private _startSecondGame() {
    this.turn = 'waiting_for_next_game';
    setTimeout(() => {
      this._gameState = GameState.RedPlaying;
      this.turn = PlayerRole.Red;
      this._restart();
    }, NEXT_GAME_DELAY);
  }
}

function hasGotItRight(player: SkockoPlayer) {
  const lastTry = last(player.tries);
  return lastTry.result.every(Boolean);
}

function usedAllTries(player: SkockoPlayer) {
  return player.tries.length >= 6;
}

function getGoal() {
  const options = [
    Skocko.Herc,
    Skocko.Pik,
    Skocko.Srce,
    Skocko.Tref,
    Skocko.Zvezda,
    Skocko.Skocko
  ];

  const goal: Skocko[] = [];
  for (let i = 0; i < 4; i++) {
    const optionIndex = getRandomNumber({ min: 0, max: options.length - 1 });
    goal.push(options[optionIndex]);
  }

  return goal;
}
