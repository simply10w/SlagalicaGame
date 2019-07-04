import { Schema, type } from 'colyseus.js';
import { SpojnicaGame, SpojniceStates, PlayerRole } from '@slagalica/data';
import { getOneRandomCollectionItem } from '@slagalica-api/util';
import { SpojnicaGameModel } from '@slagalica-api/models';
import { ArraySchema } from '@colyseus/schema';
import { shuffle } from 'lodash';

class SpojnicaPlayer extends Schema {
  @type('number')
  points: number = 0;
}

export class SpojniceGameState extends Schema {
  game: SpojnicaGame;

  @type(SpojnicaPlayer)
  red = new SpojnicaPlayer();

  @type(SpojnicaPlayer)
  blue = new SpojnicaPlayer();

  @type('string')
  state: SpojniceStates;

  @type('number')
  currentIndex = 0;

  @type(['string'])
  leftSide = new ArraySchema<string>();

  @type(['string'])
  rightSide = new ArraySchema<string>();

  @type(['number'])
  solved = new ArraySchema<number>();

  constructor() {
    super();
  }

  async initGame() {
    this.game = await this.getGame();
    this.currentIndex = 0;
    this.state = SpojniceStates.BluePlaying;

    let left = [];
    let right = [];
    this.game.pairs.forEach(pair => {
      left.push(pair[0]);
      right.push(pair[1]);
    });

    left = shuffle(left);
    right = shuffle(right);

    this.leftSide = new ArraySchema(...left);
    this.rightSide = new ArraySchema(...right);
  }

  getGame() {
    return getOneRandomCollectionItem(SpojnicaGameModel);
  }

  guess(player: PlayerRole, guess: string) {
    if (this.state === SpojniceStates.Finished) return;
    if (!this.rightSide.includes(guess)) return;
    this.currentIndex++;
  }

  skip(player: PlayerRole) {
    if (this.state === SpojniceStates.Finished) return;
    this.currentIndex++;
  }
}
