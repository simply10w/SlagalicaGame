import { Schema, type } from 'colyseus.js';
import { getRandomCyrillicLetter } from '@slagalica/common';
import { ArraySchema } from '@colyseus/schema';

class SlagalicaTry extends Schema {
  @type('string')
  word: string;
}

const LettersSchema = new ArraySchema<string>();

export class SlagalicaGameState extends Schema {
  @type(['string'])
  letters = new ArraySchema<string>();

  @type(SlagalicaTry)
  redPlayerTry: SlagalicaTry = new SlagalicaTry();

  @type(SlagalicaTry)
  bluePlayerTry: SlagalicaTry = new SlagalicaTry();

  constructor() {
    super();
  }

  async initGame() {
    this.letters = new ArraySchema(...this.getLetters());
  }

  getLetters() {
    const letters: string[] = [];
    for (let i = 0; i < 12; i++) {
      letters.push(getRandomCyrillicLetter());
    }
    return letters;
  }
}
