import { ArraySchema } from '@colyseus/schema';
import { AsocijacijaGame } from '@slagalica/data';
import { Schema, type } from 'colyseus.js';
import { flatMap, lowerCase, trim } from 'lodash';

export class AsocijacijaGameState extends Schema {
  @type(['string'])
  tiles = new ArraySchema<string>();

  @type(['boolean'])
  solved = new ArraySchema<boolean>();

  @type('boolean')
  finished: boolean;

  game: AsocijacijaGame;

  @type('number')
  points = 0;

  async initGame(game: AsocijacijaGame) {
    this.game = game;
    const tiles = Array<string>(21).fill('');
    this.tiles = new ArraySchema(...tiles);
    const solved = Array<boolean>(5).fill(false);
    this.solved = new ArraySchema<boolean>(...solved);
  }

  openTile(tile: number) {
    if (this.tiles[tile] || this.finished) return;

    /** if out of range */
    if (tile < 0 || tile > 20) return;
    /** if trying to open final solution or group solution */
    if (tile === 20 || tile % 5 === 4) return;
    // [0,1,2,3,4,  5,6,7,8,9,  10,11,12,13,14,  15,16,17,18,19, 20]
    const group = Math.floor(tile / 5);
    const hint = tile % 5;
    this.tiles[tile] = this.game.groups[group].hints[hint];
  }

  endGame() {
    this._uncoverAllTiles();
    this._uncoverSolution();
  }

  solveGame(solution: string) {
    this.solve(4, solution);
  }

  solve(group: number, solution: string) {
    if (group < 0 || group > 4) return;
    if (this.finished) return;

    solution = lowerCase(trim(solution));
    /**
     * Trying to solve the final solution
     */
    if (group === 4) {
      /** if solution correct */
      if (this.game.solutions.includes(solution)) {
        /**
         * for each unsolved group give him 5 points
         */
        this.solved.forEach(isSolved => {
          if (!isSolved) this.points += 5;
        });

        /**
         * for final solution give him 10 points
         */
        this.points += 10;

        /**
         * uncover final solution
         */
        this._uncoverAllTiles();
        this._uncoverSolution(solution);
        this.finished = true;
      }
    } else if (group >= 0 || group < 4) {
      if (this._isCorrectSolution(group, solution)) {
        /**
         * for solving group give him 5 points
         */
        this.points += 5;
        this.solved[group] = true;
        this._uncoverGroup(group, solution);
      }
    }
  }

  private _isCorrectSolution(group: number, solution: string) {
    return this.game.groups[group].solutions.includes(solution);
  }

  private _uncoverGroup(group: number, solution?: string) {
    this.tiles[group * 5 + 0] = this.game.groups[group].hints[0];
    this.tiles[group * 5 + 1] = this.game.groups[group].hints[1];
    this.tiles[group * 5 + 2] = this.game.groups[group].hints[2];
    this.tiles[group * 5 + 3] = this.game.groups[group].hints[3];
    this.tiles[group * 5 + 4] =
      solution || this.game.groups[group].solutions[0];
  }

  private _uncoverAllTiles() {
    this.tiles = new ArraySchema(
      ...flatMap(this.game.groups, g => [...g.hints, g.solutions[0]])
    );
  }

  private _uncoverSolution(solution?: string) {
    this.tiles[20] =
      this.tiles[20] || (solution ? solution : this.game.solutions[0]);
  }
}
