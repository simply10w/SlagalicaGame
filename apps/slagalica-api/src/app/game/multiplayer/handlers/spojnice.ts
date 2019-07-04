import {
  GameType,
  SpojnicaGuessMessage,
  SpojnicaSkipMessage,
  PlayerRole
} from '@slagalica/data';
import { Room } from 'colyseus';
import { SpojniceGameState, State } from '../state';
import { GameHandler } from './shared';

export class SpojniceGameHandler extends GameHandler {
  constructor(room: Room<State>) {
    super(room);
  }

  async initGame() {
    this.room.state.currentGame = GameType.Spojnice;
    this.room.state.spojniceGame = new SpojniceGameState();
    await this.room.state.spojniceGame.initGame();
  }

  onMessage(
    player: string,
    message: SpojnicaGuessMessage | SpojnicaSkipMessage
  ) {
    const role: PlayerRole = this._getPlayerRole(player);
    if (!role) return;

    if (message.type === 'guess_spojnica') {
      this.room.state.spojniceGame.guess(role, message.guess);
    } else if (message.type === 'skip_spojnica') {
      this.room.state.spojniceGame.skip(role);
    }
  }
}
