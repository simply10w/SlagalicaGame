import { ArraySchema } from '@colyseus/schema';
import { SlagalicaGame } from '@slagalica-api/game/shared';
import { WordModel } from '@slagalica-api/models';
import { GameWinner } from '@slagalica/data';
import { Schema, type } from 'colyseus.js';

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
    this.letters = new ArraySchema(...SlagalicaGame.getLetters());
  }

  async calculateWinner() {
    const blueWord = this.blue.word;
    const redWord = this.red.word;
    const invalidWord = 'Word is invalid.';
    let foundBlue, foundRed;

    if (blueWord && SlagalicaGame.validateWord(this.letters, blueWord)) {
      foundBlue = await WordModel.findOne({
        word: blueWord
      });
    }

    if (redWord && SlagalicaGame.validateWord(this.letters, redWord)) {
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

      this.blue.points = SlagalicaGame.calculatePoints(blueWord);
      this.red.points = SlagalicaGame.calculatePoints(redWord);
      /**
       * If only blue has correct word
       */
    } else if (foundBlue) {
      this.red.error = invalidWord;
      this.winner = GameWinner.Blue;
      this.blue.points = SlagalicaGame.calculatePoints(blueWord);
      /**
       * If only red has correct word
       */
    } else if (foundRed) {
      this.blue.error = invalidWord;
      this.winner = GameWinner.Red;
      this.red.points = SlagalicaGame.calculatePoints(redWord);
      /**
       * If both have invalid words
       */
    } else {
      this.red.error = invalidWord;
      this.blue.error = invalidWord;
      this.winner = GameWinner.None;
    }
  }
}
