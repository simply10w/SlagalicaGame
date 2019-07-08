import {
  createSingleplayerGameResult,
  getGameOfTheDay
} from '@slagalica-api/models';
import { Logger } from '@slagalica-api/util';
import { AsocijacijaGame, GameType, SpojnicaGame } from '@slagalica/data';
import { Room } from 'colyseus';
import {
  AsocijacijaGameHandler,
  GameHandler,
  MojBrojGameHandler,
  SkockoGameHandler,
  SlagalicaGameHandler,
  SpojniceGameHandler
} from './handlers';
import { State } from './state';

const NEXT_GAME_DELAY = 3 * 1000;

export class GameFlow {
  currentGame: GameHandler;

  gameSaved: boolean;

  gameOfTheDay: string;

  spojnicaGame: SpojnicaGame;

  asocijacijaGame: AsocijacijaGame;

  constructor(public room: Room<State>) {}

  onMessage(player: string, data: any) {
    if (this.currentGame && this.room.state.player.playerId === player) {
      this.currentGame.onMessage(data);
    }
  }

  start() {
    getGameOfTheDay().then(game => {
      this.gameOfTheDay = game._id;
      this.spojnicaGame = game.spojnica;
      this.asocijacijaGame = game.asocijacija;

      this._nextStep();

      this.room.on('end_game', () => {
        if (this.currentGame) {
          this.currentGame.clearTimer();
          this._updateTotalPoints();
        }
        setTimeout(() => {
          this._nextStep();
        }, NEXT_GAME_DELAY);
      });
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
        this.currentGame = new SpojniceGameHandler(
          this.room,
          this.spojnicaGame
        );
        break;
      }
      case GameType.Spojnice: {
        this.currentGame = new AsocijacijaGameHandler(
          this.room,
          this.asocijacijaGame
        );
        break;
      }
      case GameType.Asocijacije: {
        this.currentGame = null;
        this.room.state.currentGame = GameType.Finished;
        break;
      }
    }

    if (this.room.state.currentGame === GameType.Finished) {
      this._logGame();
    } else if (this.currentGame) {
      this.currentGame.initGame().then(() => {});
    }
  }

  private _logGame() {
    if (this.gameSaved) return;

    createSingleplayerGameResult({
      points: this.room.state.player.totalPoints,
      player: this.room.state.player.userId,
      game: this.gameOfTheDay
    }).then(() => {
      this.gameSaved = true;
      Logger.info('Game saved!');
    });
  }

  private _updateTotalPoints() {
    switch (this.room.state.currentGame) {
      case GameType.Slagalica: {
        this.room.state.player.totalPoints += this.room.state.slagalicaGame.points;
        break;
      }

      case GameType.MojBroj: {
        this.room.state.player.totalPoints += this.room.state.mojBrojGame.points;
        break;
      }

      case GameType.Skocko: {
        this.room.state.player.totalPoints += this.room.state.skockoGame.points;
        break;
      }

      case GameType.Spojnice: {
        this.room.state.player.totalPoints += this.room.state.spojniceGame.points;
        break;
      }

      case GameType.Asocijacije: {
        this.room.state.player.totalPoints += this.room.state.asocijacijeGame.points;
        break;
      }
    }
  }
}
