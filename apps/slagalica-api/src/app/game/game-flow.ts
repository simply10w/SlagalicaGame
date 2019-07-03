import { State, GameType } from './state';
import {
  GameHandler,
  SlagalicaGameHandler,
  SpojniceGameHandler,
  SkockoGameHandler,
  MojBrojGameHandler,
  AsocijacijaGameHandler
} from './handlers';
import { Room } from 'colyseus';

export class GameFlow {
  currentGame: GameHandler;

  constructor(public room: Room<State>) {}

  onMessage(player: string, data: any) {
    this.currentGame.onMessage(player, data);
  }

  start() {
    this._nextStep();
    this._startGame();

    this.room.on('next_game', () => {
      this._nextStep();
      this._startGame();
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
        this.currentGame = new SpojniceGameHandler(this.room);
        break;
      }
      case GameType.MojBroj: {
        this.currentGame = new SkockoGameHandler(this.room);
        break;
      }
      case GameType.Skocko: {
        this.currentGame = new AsocijacijaGameHandler(this.room);
        break;
      }
      case GameType.Asocijacije: {
        this.room.state.currentGame = GameType.Finished;
        break;
      }
    }

    if (this.room.state.currentGame === GameType.Finished) {
      // SAVE IN DB
    }
  }

  private _startGame() {
    this.currentGame.initGame().then(() =>
      this.room.broadcast({
        type: `${this.room.state.currentGame}/game_started`
      })
    );
  }
}
