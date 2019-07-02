import { Schema, type } from 'colyseus.js';
import { MapSchema } from '@colyseus/schema';
import { PlayerRole, AsocijacijaGame } from '@slagalica/data';
import { AsocijacijaGameModel } from '@slagalica-api/models';
import { getOneRandomCollectionItem } from '@slagalica-api/util';

/**
 * we need to track 2 things
 *
 * which player opened which tile
 * which groups are solved
 */
export class AsocijacijaGameState extends Schema {
  @type({
    map: 'string'
  })
  openedTiles = new MapSchema<PlayerRole>();

  game: AsocijacijaGame;

  openTile(role: PlayerRole, group: number, tile: number) {
    if (this.openedTiles[tile]) return;
    // this.openedTiles
    // this.game.groups[group].hints[tile];

    // _group.hints.some(hint => hint === tile);

    // this.openedTiles
    // this.
  }

  async initGame() {
    this.game = await this.getGame();
  }

  getGame() {
    return getOneRandomCollectionItem(AsocijacijaGameModel);
  }
}
