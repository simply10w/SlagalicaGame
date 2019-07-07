import { Schema, type } from 'colyseus.js';
import { getRandomLatinLetter } from '@slagalica/common';
import { ArraySchema } from '@colyseus/schema';
import { WordModel } from '@slagalica-api/models';
import { GameWinner } from '@slagalica/data';
import { upperCase, trim, Dictionary } from 'lodash';

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
    const blueWord = upperCase(trim(this.blue.word));
    const redWord = upperCase(trim(this.red.word));
    const invalidWord = 'Word is invalid.';
    let foundBlue, foundRed;

    if (blueWord && this._validateWord(blueWord)) {
      foundBlue = await WordModel.findOne({
        word: blueWord
      });
    }

    if (redWord && this._validateWord(redWord)) {
      foundRed = await WordModel.findOne({
        word: redWord
      });
    }

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
      letters.push(getRandomLatinLetter());
    }
    return letters;
  }

  private _validateWord(word: string) {
    const charTable = this.letters.reduce((table, letter) => {
      table[letter] = table[letter] ? table[letter] + 1 : 1;
      return table;
    }, {});
    for (const char of word) {
      if (!charTable[char]) return false;
      if (charTable[char]) {
        if (charTable[char] > 0) charTable[char]--;
        else return false;
      }
    }
    return true;
  }
}
