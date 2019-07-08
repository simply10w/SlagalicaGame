import { ArraySchema } from '@colyseus/schema';
import { SlagalicaGame } from '@slagalica-api/game/shared';
import { WordModel } from '@slagalica-api/models';
import { Schema, type } from 'colyseus.js';

export class SlagalicaGameState extends Schema {
  @type(['string'])
  letters = new ArraySchema<string>();

  @type('number')
  points: number = 0;

  @type('string')
  word: string;

  @type('string')
  error: string;

  async initGame() {
    this.letters = new ArraySchema(...SlagalicaGame.getLetters());
  }

  async calculateWinner() {
    const word = this.word;
    const invalidWord = 'Word is invalid.';
    let foundWord;

    if (word && SlagalicaGame.validateWord(this.letters, word)) {
      foundWord = await WordModel.findOne({
        word
      }).exec();
    }

    if (foundWord) {
      this.points = SlagalicaGame.calculatePoints(word);
    } else {
      this.error = invalidWord;
    }
  }
}
