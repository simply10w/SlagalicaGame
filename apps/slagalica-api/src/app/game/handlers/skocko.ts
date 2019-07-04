import { GameType, PlayerRole, SkockoMessage } from '@slagalica/data';
import { Room } from 'colyseus';
import { SkockoGameState, State } from '../state';
import { GameHandler } from './shared';

export class SkockoGameHandler extends GameHandler {
  constructor(room: Room<State>) {
    super(room);
  }

  async initGame() {
    this.room.state.currentGame = GameType.Skocko;
    this.room.state.skockoGame = new SkockoGameState();
    await this.room.state.skockoGame.initGame();
  }

  onMessage(player: string, message: SkockoMessage) {
    let role: PlayerRole;
    if (this._red === player) {
      role = PlayerRole.Red;
    } else if (this._blue === player) {
      role = PlayerRole.Blue;
    }

    if (!role) return;

    const gameFinished = this.room.state.skockoGame.check(
      role,
      message.sequence
    );

    if (gameFinished) {
      this.declareEndGame(null);
    }
  }
}
