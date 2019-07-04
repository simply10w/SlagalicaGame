import { GameType } from '@slagalica/data';
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

  constructor(public room: Room<State>) {}

  onMessage(player: string, data: any) {
    this.currentGame.onMessage(player, data);
  }

  start() {
    this._nextStep();

    this.room.on('end_game', () => {
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
        this.room.state.currentGame = GameType.Finished;
        break;
      }
    }

    if (this.room.state.currentGame === GameType.Finished) {
      // SAVE IN DB
      // BROADCAST END OF GAME
    } else {
      this.currentGame.initGame().then(() => {});
    }
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
    }
  }
}
