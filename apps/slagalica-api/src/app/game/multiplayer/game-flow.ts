import { GameType, PlayerRole } from '@slagalica/data';
import { Room } from 'colyseus';
import {
  AsocijacijaGameHandler,
  GameHandler,
  MojBrojGameHandler,
  SkockoGameHandler,
  SlagalicaGameHandler,
  SpojniceGameHandler
} from './handlers';
import { Logger } from '@slagalica-api/util';
import { State } from './state';
import { createMultiplayerGameResult } from '@slagalica-api/models';

const NEXT_GAME_DELAY = 3 * 1000;

export class GameFlow {
  currentGame: GameHandler;

  gameSaved: boolean;

  constructor(public room: Room<State>) {}

  onMessage(player: string, data: any) {
    if (this.currentGame) {
      this.currentGame.onMessage(player, data);
    }
  }

  start() {
    this._nextStep();

    this.room.on('end_game', () => {
      this.currentGame.clearTimer();
      this._updateTotalPoints();
      setTimeout(() => {
        this._nextStep();
      }, NEXT_GAME_DELAY);
    });
  }

  private _nextStep() {
    switch (this.room.state.currentGame) {
      case GameType.NotStarted: {
        this.currentGame = new SlagalicaGameHandler(this.room);
        break;
      }
      case GameType.Slagalica: {
        this.currentGame = new MojBrojGameHandler(this.room);
        break;
      }
      case GameType.MojBroj: {
        this.currentGame = new SkockoGameHandler(this.room);
        break;
      }
      case GameType.Skocko: {
        this.currentGame = new SpojniceGameHandler(this.room);
        break;
      }
      case GameType.Spojnice: {
        this.currentGame = new AsocijacijaGameHandler(this.room);
        break;
      }
      case GameType.Asocijacije: {
        this.currentGame = null;
        this.room.state.currentGame = GameType.Finished;
        break;
      }
    }

    if (this.room.state.currentGame === GameType.Finished) {
      this._declareWinner();
      this._logGame();
    } else if (this.currentGame) {
      this.currentGame.initGame().then(() => {});
    }
  }

  private _declareWinner() {
    const blue = this.room.state.blue;
    const red = this.room.state.red;

    let winner: PlayerRole;
    if (blue.totalPoints > red.totalPoints) winner = PlayerRole.Blue;
    else if (blue.totalPoints < red.totalPoints) winner = PlayerRole.Red;
    else winner = null;

    this.room.state.winner = winner;
  }

  private _logGame() {
    if (this.gameSaved) return;
    const blue = this.room.state.blue;
    const red = this.room.state.red;

    createMultiplayerGameResult({
      bluePoints: blue.totalPoints,
      blue: blue.userId,
      red: red.userId,
      redPoints: red.totalPoints,
      won: this.room.state.winner
    }).then(() => {
      this.gameSaved = true;
      Logger.info('Game saved!');
    });
  }

  private _updateTotalPoints() {
    switch (this.room.state.currentGame) {
      case GameType.Slagalica: {
        this.room.state.blue.totalPoints += this.room.state.slagalicaGame.blue.points;
        this.room.state.red.totalPoints += this.room.state.slagalicaGame.red.points;
        break;
      }

      case GameType.MojBroj: {
        this.room.state.blue.totalPoints += this.room.state.mojBrojGame.blue.points;
        this.room.state.red.totalPoints += this.room.state.mojBrojGame.red.points;
        break;
      }

      case GameType.Skocko: {
        this.room.state.blue.totalPoints += this.room.state.skockoGame.blue.points;
        this.room.state.red.totalPoints += this.room.state.skockoGame.red.points;
        break;
      }

      case GameType.Spojnice: {
        this.room.state.blue.totalPoints += this.room.state.spojniceGame.blue.points;
        this.room.state.red.totalPoints += this.room.state.spojniceGame.red.points;
        break;
      }

      case GameType.Asocijacije: {
        this.room.state.blue.totalPoints += this.room.state.asocijacijeGame.blue.points;
        this.room.state.red.totalPoints += this.room.state.asocijacijeGame.red.points;
        break;
      }
    }
  }
}
