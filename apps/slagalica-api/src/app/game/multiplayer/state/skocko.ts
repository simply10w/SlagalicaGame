import { ArraySchema } from '@colyseus/schema';
import { SkockoGame } from '@slagalica-api/game/shared';
import { emptyArraySchema } from '@slagalica-api/util';
import {
  PlayerRole,
  Skocko,
  SkockoGameStates,
  SkockoPositionResult
} from '@slagalica/data';
import { Schema, type } from 'colyseus.js';

class SkockoTry extends Schema {
  @type(['string'])
  try = new ArraySchema<Skocko>();

  @type(['string'])
  result = new ArraySchema<SkockoPositionResult>();
}

class SkockoPlayer extends Schema {
  @type([SkockoTry])
  tries = new ArraySchema<SkockoTry>();

  @type('number')
  points = 0;
}

const WINNER_POINTS = SkockoGame.WINNER_POINTS;
const NEXT_GAME_DELAY = 3 * 1000; // 3 SECONDS

export class SkockoGameState extends Schema {
  @type(SkockoPlayer)
  red = new SkockoPlayer();

  @type(SkockoPlayer)
  blue = new SkockoPlayer();

  turn: PlayerRole;

  goal: Skocko[] = [];

  @type('boolean')
  gameEnded: boolean;

  @type('string')
  gameState: SkockoGameStates = SkockoGameStates.NotStarted;

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

    const results = SkockoGame.getPositionResults(this.goal, sequence);
    const skockoTry = new SkockoTry();
    skockoTry.try = new ArraySchema(...sequence);
    skockoTry.result = new ArraySchema(...results);
    skockoPlayer.tries.push(skockoTry);

    this._goToNextGameStep();

    return this.gameEnded === true;
  }

  private _goToNextGameStep() {
    switch (this.gameState) {
      case SkockoGameStates.NotStarted:
        this.goal = SkockoGame.getGoal();
        this._startFirstGame();
        break;
      case SkockoGameStates.BluePlaying:
        /**
         * if blue got it right
         **/
        if (SkockoGame.hasGotItRight(this.blue)) {
          this.blue.points = WINNER_POINTS;
          this._startSecondGame();

          /**
           * If blue has used all his tries
           */
        } else if (SkockoGame.usedAllTries(this.blue)) {
          this.gameState = SkockoGameStates.BlueStrikeOutRedPlaying;
          clearTries(this.red);
          this.turn = PlayerRole.Red;
        }
        break;
      case SkockoGameStates.BlueStrikeOutRedPlaying:
        /**
         * if red got it right
         */
        if (SkockoGame.hasGotItRight(this.red)) {
          this.red.points = WINNER_POINTS;
        }
        /**
         * He has one try so nonetheless we go to next stage
         */
        this._startSecondGame();
        break;
      case SkockoGameStates.RedPlaying:
        /**
         * if red got it right
         **/
        if (SkockoGame.hasGotItRight(this.red)) {
          this.red.points = WINNER_POINTS;
          this.gameEnded = true;

          /**
           * If red has used all his tries
           */
        } else if (SkockoGame.usedAllTries(this.red)) {
          this.gameState = SkockoGameStates.RedStrikeOutBluePlaying;
          clearTries(this.blue);
          this.turn = PlayerRole.Blue;
        }
        break;
      case SkockoGameStates.RedStrikeOutBluePlaying:
        /**
         * if blue got it right
         */
        if (SkockoGame.hasGotItRight(this.blue)) {
          this.blue.points = WINNER_POINTS;
        }

        this.gameEnded = true;
        break;
    }
  }

  private _restart() {
    this.red.tries = new ArraySchema();
    this.blue.tries = new ArraySchema();
    this.goal = SkockoGame.getGoal();
  }

  private _getSkockoPlayer() {
    switch (this.turn) {
      case PlayerRole.Blue:
        return this.blue;
      case PlayerRole.Red:
        return this.red;
    }
  }

  private _startFirstGame() {
    this.gameState = SkockoGameStates.BluePlaying;
    clearTries(this.blue);
    this.turn = PlayerRole.Blue;
    this._restart();
  }

  private _startSecondGame() {
    setTimeout(() => {
      this.gameState = SkockoGameStates.RedPlaying;
      clearTries(this.red);
      this.turn = PlayerRole.Red;
      this._restart();
    }, NEXT_GAME_DELAY);
  }
}

function clearTries(player: SkockoPlayer) {
  emptyArraySchema(player.tries);
}
