import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AsocijacijaGameActions } from '@slagalica-app/player/actions';
import { AsocijacijaStates } from '@slagalica/data';
import { times } from 'lodash';
import { selectors } from './asocijacija.selectors';

@Component({
  selector: 'sla-asocijacija-game',
  templateUrl: 'asocijacija-game.component.html',
  styleUrls: ['./asocijacija-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsocijacijaGameComponent {
  AsocijacijaStates = AsocijacijaStates;

  currentStateDescription$ = this.store.pipe(
    select(selectors.getCurrentStateDescription)
  );
  turnColor$ = this.store.pipe(select(selectors.getTurnColor));

  isInputEnabled$ = this.store.pipe(select(selectors.isInputEnabled));

  tilesList$ = this.store.pipe(select(selectors.getTiles));
  solvedList$ = this.store.pipe(select(selectors.getSolvedList));

  redPlayerPoints$ = this.store.pipe(select(selectors.getRedPlayerPoints));
  bluePlayerPoints$ = this.store.pipe(select(selectors.getBluePlayerPoints));

  gameSolution$ = this.store.pipe(select(selectors.getGameSolution));

  groupSolutions = times(4, () => '');
  gameSolution = '';

  GROUPS = times(4);
  HINTS = times(4);

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

  changeGameSolution(change: string) {
    this.gameSolution = change;
  }
}
