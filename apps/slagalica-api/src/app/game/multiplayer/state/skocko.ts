import { ArraySchema } from '@colyseus/schema';
import { getRandomNumber } from '@slagalica/common';
import {
  PlayerRole,
  Skocko,
  SkockoGameStates,
  SkockoPositionResult
} from '@slagalica/data';
import { Schema, type } from 'colyseus.js';
import { last } from 'lodash';
import { emptyArraySchema } from '@slagalica-api/util';

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

const WINNER_POINTS = 10;
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

    const results = getPositionResults(this.goal, sequence);
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
        this.goal = getGoal();
        this._startFirstGame();
        break;
      case SkockoGameStates.BluePlaying:
        /**
         * if blue got it right
         **/
        if (hasGotItRight(this.blue)) {
          this.blue.points = WINNER_POINTS;
          this._startSecondGame();

          /**
           * If blue has used all his tries
           */
        } else if (usedAllTries(this.blue)) {
          this.gameState = SkockoGameStates.BlueStrikeOutRedPlaying;
          clearTries(this.red);
          this.turn = PlayerRole.Red;
        }
        break;
      case SkockoGameStates.BlueStrikeOutRedPlaying:
        /**
         * if red got it right
         */
        if (hasGotItRight(this.red)) {
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
        if (hasGotItRight(this.red)) {
          this.red.points = WINNER_POINTS;
          this.gameEnded = true;

          /**
           * If red has used all his tries
           */
        } else if (usedAllTries(this.red)) {
          this.gameState = SkockoGameStates.RedStrikeOutBluePlaying;
          clearTries(this.blue);
          this.turn = PlayerRole.Blue;
        }
        break;
      case SkockoGameStates.RedStrikeOutBluePlaying:
        /**
         * if blue got it right
         */
        if (hasGotItRight(this.blue)) {
          this.blue.points = WINNER_POINTS;
        }

        this.gameEnded = true;
        break;
    }
  }

  private _restart() {
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

function getPositionResults(goal: Skocko[], sequence: Skocko[]) {
  const goalSet = new Set(goal);
  return sequence.map((seqItem, index) => {
    if (goal[index] === seqItem) return SkockoPositionResult.InPosition;
    else if (goalSet.has(seqItem)) return SkockoPositionResult.WrongPosition;
    else return SkockoPositionResult.NotInSequence;
  });
}

function hasGotItRight(player: SkockoPlayer) {
  const lastTry = last(player.tries);
  return lastTry.result.every(
    result => result === SkockoPositionResult.InPosition
  );
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
