import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { map, withLatestFrom, tap } from 'rxjs/operators';
import { PlayerRole, AsocijacijaStates } from '@slagalica/data';
import { times } from 'lodash';
import { AsocijacijaGameActions } from '@slagalica-app/player/actions';

@Component({
  selector: 'sla-asocijacija-game',
  templateUrl: 'asocijacija-game.component.html',
  styleUrls: ['./asocijacija-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsocijacijaGameComponent {
  amIRed$ = this.store.pipe(select(fromPlayer.getAmIRed));
  amIBlue$ = this.store.pipe(select(fromPlayer.getAmIBlue));

  game$ = this.store
    .pipe(select(fromPlayer.getAsocijacijaGame))
    .pipe(tap(() => this.cd.markForCheck()));

  AsocijacijaStates = AsocijacijaStates;

  turn$ = this.game$.pipe(map(game => game.state));

  turnColor$ = this.turn$.pipe(
    map(turn => {
      return {
        red:
          turn === AsocijacijaStates.RedPlaying ||
          turn === AsocijacijaStates.RedSolving,
        blue:
          turn === AsocijacijaStates.BluePlaying ||
          turn === AsocijacijaStates.BlueSolving
      };
    })
  );

  disabledInputs$ = this.turn$.pipe(
    withLatestFrom(this.amIRed$, this.amIBlue$),
    map(([turn, amIRed, amIBlue]) => {
      if (turn === AsocijacijaStates.RedSolving && amIRed) {
        return false;
      } else if (turn === AsocijacijaStates.BlueSolving && amIBlue) {
        return false;
      } else {
        return true;
      }
    })
  );

  groupSolutions = times(4, () => '');
  gameSolution = '';

  GROUPS = times(4);
  HINTS = times(4);

  solved$ = this.game$.pipe(
    map(game => game.solved),
    map(solved => {
      const solutions = [4, 9, 14, 19];
      return solutions.map(solution => solved[solution]).map(Boolean);
    })
  );

  constructor(private store: Store<any>, private cd: ChangeDetectorRef) {}

  openTile(tile: number) {
    this.store.dispatch(
      AsocijacijaGameActions.openTile({
        tile
      })
    );
  }

  solveGroup(group: number) {
    this.store.dispatch(
      AsocijacijaGameActions.solveGroup({
        group,
        solution: this.groupSolutions[group]
      })
    );

    this.groupSolutions = times(4, () => '');
  }

  solveGame() {
    this.store.dispatch(
      AsocijacijaGameActions.solveGame({
        solution: this.gameSolution
      })
    );

    this.gameSolution = '';
  }
}
