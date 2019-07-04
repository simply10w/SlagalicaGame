import { Schema, type } from 'colyseus.js';
import { getRandomCyrillicLetter } from '@slagalica/common';
import { ArraySchema } from '@colyseus/schema';
import { WordModel } from '@slagalica-api/models';
import { GameWinner } from '@slagalica/data';

class SlagalicaPlayer extends Schema {
  @type('string')
  word: string;

  @type('string')
  error: string;

  @type('number')
  points: number = 0;
}

export class SlagalicaGameState extends Schema {
  @type(['string'])
  letters = new ArraySchema<string>();

  @type(SlagalicaPlayer)
  red: SlagalicaPlayer = new SlagalicaPlayer();

  @type(SlagalicaPlayer)
  blue: SlagalicaPlayer = new SlagalicaPlayer();

  @type('string')
  winner: GameWinner;

  constructor() {
    super();
  }

  async initGame() {
    this.letters = new ArraySchema(...this._getLetters());
  }

  async calculateWinner() {
    const blueWord = this.blue.word;
    const redWord = this.red.word;
    const [foundBlue, foundRed] = await Promise.all([
      blueWord
        ? WordModel.findOne({
            word: blueWord
          })
        : Promise.resolve(null),
      redWord
        ? WordModel.findOne({
            word: redWord
          })
        : Promise.resolve(null)
    ]);

    const invalidWord = 'Word is invalid.';

    /**
     * if Both have correct words
     */
    if (foundBlue && foundRed) {
      const blueLength = blueWord.length;
      const redLength = redWord.length;

      /**
       * Check who has longer word
       */
      if (blueLength > redLength) this.winner = GameWinner.Blue;
      else if (blueLength < redLength) this.winner = GameWinner.Red;
      else this.winner = GameWinner.Both;

      this.blue.points = this._calculatePoints(blueWord);
      this.red.points = this._calculatePoints(redWord);
      /**
       * If only blue has correct word
       */
    } else if (foundBlue) {
      this.red.error = invalidWord;
      this.winner = GameWinner.Blue;
      this.blue.points = this._calculatePoints(blueWord);
      /**
       * If only red has correct word
       */
    } else if (foundRed) {
      this.blue.error = invalidWord;
      this.winner = GameWinner.Red;
      this.red.points = this._calculatePoints(redWord);
      /**
       * If both have invalid words
       */
    } else {
      this.red.error = invalidWord;
      this.blue.error = invalidWord;
      this.winner = GameWinner.None;
    }
  }

  private _calculatePoints(word: string) {
    return word.length * 2;
  }

  private _getLetters() {
    const letters: string[] = [];
    for (let i = 0; i < 12; i++) {
      letters.push(getRandomCyrillicLetter());
    }
    return letters;
  }
}
