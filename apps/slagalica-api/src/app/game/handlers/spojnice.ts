import { SpojniceGameState, State, GameType } from '../state';
import { GameHandler } from './shared';
import { Room } from 'colyseus';

export class SpojniceGameHandler implements GameHandler {
  constructor(public room: Room<State>) {}

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
