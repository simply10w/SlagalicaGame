import { Subject } from 'rxjs';
import { SkockoGameState, State, GameType } from '../state';
import { GameHandler } from './shared';
import { Room } from 'colyseus';

export class SkockoGameHandler implements GameHandler {
  constructor(public room: Room<State>) {}

  async initGame() {
    this.room.state.currentGame = GameType.Skocko;
    this.room.state.skockoGame = new SkockoGameState();
    await this.room.state.skockoGame.initGame();
  }

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
