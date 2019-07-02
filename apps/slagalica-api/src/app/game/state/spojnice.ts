import { Schema, type } from 'colyseus.js';
import { SpojnicaGame } from '@slagalica/data';
import { getOneRandomCollectionItem } from '@slagalica-api/util';
import { SpojnicaGameModel } from '@slagalica-api/models';

export class SpojniceGameState extends Schema {
  game: SpojnicaGame;

  constructor() {
    super();
  }

  async initGame() {
    this.game = await this.getGame();
  }

  getGame() {
    return getOneRandomCollectionItem(SpojnicaGameModel);
  }
}
