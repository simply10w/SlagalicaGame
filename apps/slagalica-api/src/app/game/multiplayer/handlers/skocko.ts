import { GameType, PlayerRole, SkockoMessage } from '@slagalica/data';
import { Logger } from '@slagalica-api/util';

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
    const role: PlayerRole = this._getPlayerRole(player);
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
