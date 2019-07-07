import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/multiplayer/reducers';
import { MojBrojGameActions } from '@slagalica-app/multiplayer/actions';
import { selectors } from './moj-broj.selectors';

@Component({
  selector: 'sla-moj-broj-game',
  templateUrl: 'moj-broj-game.component.html',
  styleUrls: ['./moj-broj-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MojBrojGameComponent {
  formula: string;
  submitted: boolean;

  goal$ = this.store.pipe(select(selectors.getGoal));
  options$ = this.store.pipe(select(selectors.getOptions));
  winner$ = this.store.pipe(select(selectors.getWinner));

  redError$ = this.store.pipe(select(selectors.getRedError));
  redFormula$ = this.store.pipe(select(selectors.getRedFormula));
  redPoints$ = this.store.pipe(select(selectors.getRedPoints));
  redResult$ = this.store.pipe(select(selectors.getRedResult));
  redDisabled$ = this.store.pipe(select(selectors.isRedDisabled));

  blueError$ = this.store.pipe(select(selectors.getBlueError));
  blueFormula$ = this.store.pipe(select(selectors.getBlueFormula));
  bluePoints$ = this.store.pipe(select(selectors.getBluePoints));
  blueResult$ = this.store.pipe(select(selectors.getBlueResult));
  blueDisabled$ = this.store.pipe(select(selectors.isBlueDisabled));

  constructor(private store: Store<any>) {}

  submit() {
    this.submitted = true;
    this.store.dispatch(
      MojBrojGameActions.submitPlayerTry({
        formula: this.formula
      })
    );
  }

  change(formula: string) {
    this.formula = formula;
  }
}
