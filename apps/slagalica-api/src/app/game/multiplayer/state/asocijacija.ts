import { Schema, type } from 'colyseus.js';
import { MapSchema, ArraySchema } from '@colyseus/schema';
import {
  PlayerRole,
  AsocijacijaGame,
  AsocijacijaStates
} from '@slagalica/data';
import { AsocijacijaGameModel } from '@slagalica-api/models';
import { getOneRandomCollectionItem, Logger } from '@slagalica-api/util';
import { flatMap } from 'lodash';

export class AsocijacijaPlayer extends Schema {
  @type('number')
  points = 0;
}

export class AsocijacijaGameState extends Schema {
  @type(['string'])
  tiles = new ArraySchema<string>();

  @type(['string'])
  solved = new ArraySchema<PlayerRole>();

  @type('string')
  state: AsocijacijaStates;

  @type(AsocijacijaPlayer)
  red: AsocijacijaPlayer = new AsocijacijaPlayer();

  @type(AsocijacijaPlayer)
  blue: AsocijacijaPlayer = new AsocijacijaPlayer();

  game: AsocijacijaGame;

  async initGame() {
    this.game = await this._getGame();
    this.state = AsocijacijaStates.BluePlaying;

    const tiles = Array<string>(21).fill('');
    this.tiles = new ArraySchema(...tiles);

    const solved = Array<PlayerRole>(5).fill(null);
    this.solved = new ArraySchema(...solved);
  }

  openTile(player: PlayerRole, tile: number) {
    if (this.tiles[tile] || this.state === AsocijacijaStates.Finished) return;

    if (
      (player === PlayerRole.Blue &&
        this.state === AsocijacijaStates.BluePlaying) ||
      (player === PlayerRole.Red && this.state === AsocijacijaStates.RedPlaying)
    ) {
      /** if out of range */
      if (tile < 0 || tile > 20) return;

      /** if trying to open final solution or group solution */
      if (tile === 20 || tile % 5 === 4) return;

      // [0,1,2,3,4,  5,6,7,8,9,  10,11,12,13,14,  15,16,17,18,19, 20]
      const group = Math.floor(tile / 5);
      const hint = tile % 5;
      this.tiles[tile] = this.game.groups[group].hints[hint];

      if (this.state === AsocijacijaStates.BluePlaying) {
        this.state = AsocijacijaStates.BlueSolving;
      } else {
        this.state = AsocijacijaStates.RedSolving;
      }
    }
  }

  endGame() {
    this._uncoverAllTiles();
    this._uncoverSolution();
  }

  solveGame(player: PlayerRole, solution: string) {
    this.solve(player, 4, solution);
  }

  solve(player: PlayerRole, group: number, solution: string) {
    if (group < 0 || group > 4) return;
    if (this.state === AsocijacijaStates.Finished) return;

    if (
      (player === PlayerRole.Blue &&
        this.state === AsocijacijaStates.BlueSolving) ||
      (player === PlayerRole.Red && this.state === AsocijacijaStates.RedSolving)
    ) {
      const currentPlayer = this._getCurrentPlayer();
      /**
       * Trying to solve the final solution
       */
      if (group === 4) {
        /** if solution correct */
        if (this.game.solutions.includes(solution)) {
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
          this._uncoverAllTiles();
          this._uncoverSolution(solution);
          this.solved = new ArraySchema(...solved);
          this.state = AsocijacijaStates.Finished;
        } else {
          this._nextPlaying();
        }
      } else if (group >= 0 || group < 4) {
        if (this._isCorrectSolution(group, solution)) {
          /**
           * for solving group give him 5 points
           */
          currentPlayer.points += 5;
          this.solved[group] = player;
          this._uncoverGroup(group, solution);
        }

        this._nextPlaying();
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

  private _nextPlaying() {
    if (this.state === AsocijacijaStates.BlueSolving) {
      this.state = AsocijacijaStates.RedPlaying;
    } else if (this.state === AsocijacijaStates.RedSolving) {
      this.state = AsocijacijaStates.BluePlaying;
    }
  }

  private _getGame() {
    return getOneRandomCollectionItem(AsocijacijaGameModel);
  }

  private _getCurrentPlayer() {
    switch (this.state) {
      case AsocijacijaStates.BlueSolving:
        return this.blue;
      case AsocijacijaStates.RedSolving:
        return this.red;
    }
  }
}
