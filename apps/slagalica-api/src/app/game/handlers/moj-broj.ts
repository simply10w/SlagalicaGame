import { State, MojBrojGameState, GameType } from '../state';
import { GameHandler } from './shared';
import { Room } from 'colyseus';
import * as math from 'mathjs';

export class MojBrojGameHandler implements GameHandler {
  constructor(public room: Room<State>) {}

  get state() {
    return this.room.state;
  }

  get gameState() {
    return this.state.mojBrojGame;
  }

  async initGame() {
    this.state.currentGame = GameType.MojBroj;
    this.state.mojBrojGame = new MojBrojGameState();
    await this.gameState.initGame();
  }

  onMessage(player: string, message: { formula: string }) {
    if (this.state.red.playerId === player) {
      this.gameState.redPlayerTry.formula = message.formula;
    } else if (this.state.blue.playerId === player) {
      this.gameState.bluePlayerTry.formula = message.formula;
    }

    const blueTry = this.gameState.bluePlayerTry.formula;
    const redTry = this.gameState.redPlayerTry.formula;

    if (blueTry && redTry) {
      this.getWinner();
    }
  }

  getWinner() {
    try {
      this.gameState.redPlayerTry.result = math.eval(
        this.gameState.redPlayerTry.formula
      );
    } catch (err) {}

    try {
      this.gameState.bluePlayerTry.result = math.eval(
        this.gameState.bluePlayerTry.formula
      );
    } catch (err) {}

    console.log(
      this.gameState.redPlayerTry.result,
      this.gameState.redPlayerTry.formula
    );
    console.log(
      this.gameState.bluePlayerTry.result,
      this.gameState.bluePlayerTry.formula
    );
  }
}
