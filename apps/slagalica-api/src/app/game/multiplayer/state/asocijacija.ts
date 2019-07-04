import { Schema, type } from 'colyseus.js';
import { MapSchema, ArraySchema } from '@colyseus/schema';
import { PlayerRole, AsocijacijaGame } from '@slagalica/data';
import { AsocijacijaGameModel } from '@slagalica-api/models';
import { getOneRandomCollectionItem } from '@slagalica-api/util';

export const enum GameState {
  BluePlaying = 'blue_playing',
  BlueSolving = 'blue_solving',
  RedPlaying = 'red_playing',
  RedSolving = 'red_solving',
  Finished = 'finished'
}

export class AsocijacijaPlayer extends Schema {
  @type('number')
  points = 0;
}

export class AsocijacijaGameState extends Schema {
  @type(['string'])
  tiles = new ArraySchema<string>();

  @type(['string'])
  solved = new ArraySchema<PlayerRole>();

  @type(['string'])
  state: GameState;

  @type(AsocijacijaPlayer)
  red: AsocijacijaPlayer = new AsocijacijaPlayer();

  @type(AsocijacijaPlayer)
  blue: AsocijacijaPlayer = new AsocijacijaPlayer();

  game: AsocijacijaGame;

  async initGame() {
    this.game = await this._getGame();

    this.state = GameState.BluePlaying;

    const tiles = Array<string>(21).fill('');
    this.tiles = new ArraySchema(...tiles);

    const solved = Array<PlayerRole>(5).fill(null);
    this.solved = new ArraySchema(...solved);
  }

  openTile(player: PlayerRole, tile: number) {
    if (this.tiles[tile]) return;

    if (
      (player === PlayerRole.Blue && this.state === GameState.BluePlaying) ||
      (player === PlayerRole.Red && this.state === GameState.RedPlaying)
    ) {
      /** if out of range */
      if (tile < 0 || tile > 20) return;

      /** if trying to open final solution or group solution */
      if (tile === 20 || tile % 5 === 4) return;

      // [0,1,2,3,4,  5,6,7,8,9,  10,11,12,13,14,  15,16,17,18,19, 20]
      const group = Math.floor(tile / 5);
      const hint = tile % 5;
      this.tiles[tile] = this.game.groups[group].hints[hint];

      if ((this.state = GameState.BluePlaying)) {
        this.state = GameState.BlueSolving;
      } else {
        this.state = GameState.RedSolving;
      }
    }
  }

  solve(player: PlayerRole, group: number, solution: string) {
    if (group < 0 || group > 4) return;

    if (
      (player === PlayerRole.Blue && this.state === GameState.BlueSolving) ||
      (player === PlayerRole.Red && this.state === GameState.RedSolving)
    ) {
      const currentPlayer = this._getCurrentPlayer();
      /**
       * Trying to solve the final solution
       */
      if (group === 4 && this.game.solutions.includes(solution)) {
        const solved = new ArraySchema<PlayerRole>();

        /**
         * for each unsolved group give him 5 points
         */
        this.solved.forEach(solvedBy => {
          if (solvedBy) solved.push(solvedBy);
          else {
            solved.push(player);
            currentPlayer.points += 5;
          }
        });

        /**
         * for final solution give him 10 points
         */
        currentPlayer.points += 10;

        /**
         * uncover final solution
         */
        this.tiles[20] = solution;
        this.solved = new ArraySchema(...solved);
        this.state = GameState.Finished;
      } else if (this.game.groups[group].solutions.includes[solution]) {
        this.solved[group] = player;
        /**
         * for solving group give him 5 points
         */
        currentPlayer.points += 5;
        /**
         * uncover group solution
         */
        this.tiles[group * 5 + 4] = solution;

        if ((this.state = GameState.BlueSolving)) {
          this.state = GameState.RedPlaying;
        } else {
          this.state = GameState.BlueSolving;
        }
      }
    }
  }

  private _getGame() {
    return getOneRandomCollectionItem(AsocijacijaGameModel);
  }

  private _getCurrentPlayer() {
    switch (this.state) {
      case GameState.BlueSolving:
        return this.blue;
      case GameState.RedSolving:
        return this.red;
    }
  }
}
