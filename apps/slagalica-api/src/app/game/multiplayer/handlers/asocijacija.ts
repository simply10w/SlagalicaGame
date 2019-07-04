import {
  GameType,
  AsocijacijaOpenMessage,
  AsocijacijaSolveGroupMessage,
  AsocijacijaSolveGameMessage,
  PlayerRole
} from '@slagalica/data';
import { Room } from 'colyseus';
import { AsocijacijaGameState, State } from '../state';
import { GameHandler } from './shared';

const GAME_DURATION_SECONDS = 4 * 60;
export class AsocijacijaGameHandler extends GameHandler {
  constructor(room: Room<State>) {
    super(room);
  }

  async initGame() {
    this.room.state.currentGame = GameType.Asocijacije;
    this.room.state.asocijacijeGame = new AsocijacijaGameState();
    await this.room.state.asocijacijeGame.initGame();
    this._startTimer(GAME_DURATION_SECONDS, () => this._endGame());
  }

  onMessage(
    player: string,
    message:
      | AsocijacijaOpenMessage
      | AsocijacijaSolveGroupMessage
      | AsocijacijaSolveGameMessage
  ) {
    const role: PlayerRole = this._getPlayerRole(player);
    if (!role) return;

    if (message.type === 'open') {
      this.room.state.asocijacijeGame.openTile(role, message.open);
    } else if (message.type === 'solve_group') {
      this.room.state.asocijacijeGame.solve(
        role,
        message.group,
        message.solution
      );
    } else if (message.type === 'solve_game') {
      this.room.state.asocijacijeGame.solveGame(role, message.solution);
    }

    if (this.room.state.asocijacijeGame.state === 'finished') {
      this._endGame();
    }
  }

  private _endGame() {
    this.clearTimer();
    this.room.state.asocijacijeGame.endGame();
    this.declareEndGame(null);
  }
}
