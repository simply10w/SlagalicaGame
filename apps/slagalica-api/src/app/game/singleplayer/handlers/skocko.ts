import { GameType, SkockoMessage } from '@slagalica/data';

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

  onMessage(message: SkockoMessage) {
    const gameFinished = this.room.state.skockoGame.check(message.sequence);

    if (gameFinished) {
      this.declareEndGame();
    }
  }
}
