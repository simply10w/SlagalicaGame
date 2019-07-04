import { GameType } from '@slagalica/data';
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

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
