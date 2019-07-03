import { WordModel } from '@slagalica-api/models';
import { Room } from 'colyseus';
import { GameType, SlagalicaGameState, State } from '../state';
import { GameHandler } from './shared';

export class SlagalicaGameHandler implements GameHandler {
  constructor(public room: Room<State>) {}

  async initGame() {
    this.state.currentGame = GameType.Slagalica;
    this.state.slagalicaGame = new SlagalicaGameState();
    await this.state.slagalicaGame.initGame();
  }

  get state() {
    return this.room.state;
  }

  onMessage(player: string, message: { type: string; word: string }) {
    if (this.state.red.playerId === player) {
      this.state.slagalicaGame.redPlayerTry.word = message.word;
    } else if (this.state.blue.playerId === player) {
      this.state.slagalicaGame.bluePlayerTry.word = message.word;
    }

    const blueWord = this.state.slagalicaGame.bluePlayerTry.word;
    const redWord = this.state.slagalicaGame.redPlayerTry.word;

    if (blueWord && redWord) {
      this.getWinner(blueWord, redWord).then(winner => {
        console.log('WINNER IS', winner);
        this.room.broadcast({
          type: 'slagalica/winner',
          payload: {
            winner
          }
        });
        this.room.emit('next_game');
      });
    }
  }

  async getWinner(blueWord: string, redWord: string) {
    const [foundBlue, foundRed] = await Promise.all([
      WordModel.findOne({
        word: blueWord
      }),
      WordModel.findOne({
        word: redWord
      })
    ]);

    if (foundBlue && foundRed) {
      const blueLength = blueWord.length;
      const redLength = redWord.length;
      if (blueLength > redLength) return 'blue';
      else if (blueLength < redLength) return 'red';
      else return 'both';
    } else if (foundBlue) {
      return 'blue';
    } else if (foundRed) {
      return 'red';
    } else {
      return '';
    }
  }
}
