import { State, AsocijacijaGameState, GameType } from '../state';
import { GameHandler } from './shared';
import { Room } from 'colyseus';

export class AsocijacijaGameHandler implements GameHandler {
  constructor(public room: Room<State>) {}

  async initGame() {
    this.room.state.currentGame = GameType.Asocijacije;
    this.room.state.asocijacijeGame = new AsocijacijaGameState();
    await this.room.state.asocijacijeGame.initGame();
  }

  onMessage(player: string, data: { test: string }) {
    // handle asocijaija being played
    // by mutating the state appropriately
  }
}
