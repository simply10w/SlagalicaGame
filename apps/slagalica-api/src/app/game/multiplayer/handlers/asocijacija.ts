import {
  GameType,
  AsocijacijaOpenMessage,
  AsocijacijaSolveMessage,
  PlayerRole
} from '@slagalica/data';
import { Room } from 'colyseus';
import { AsocijacijaGameState, State } from '../state';
import { GameHandler } from './shared';

export class AsocijacijaGameHandler extends GameHandler {
  constructor(room: Room<State>) {
    super(room);
  }

  async initGame() {
    this.room.state.currentGame = GameType.Asocijacije;
    this.room.state.asocijacijeGame = new AsocijacijaGameState();
    await this.room.state.asocijacijeGame.initGame();
  }

  onMessage(
    player: string,
    message: AsocijacijaOpenMessage | AsocijacijaSolveMessage
  ) {
    let role: PlayerRole;
    if (this._red === player) {
      role = PlayerRole.Red;
    } else if (this._blue === player) {
      role = PlayerRole.Blue;
    }

    if (!role) return;

    if (message.type === 'open') {
      this.room.state.asocijacijeGame.openTile(role, message.open);
    } else if (message.type === 'solve') {
      this.room.state.asocijacijeGame.solve(
        role,
        message.group,
        message.solution
      );
    }

    if (this.room.state.asocijacijeGame.state === 'finished') {
      this.declareEndGame(null);
    }
  }
}
