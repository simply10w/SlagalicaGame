import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MojBrojGameActions } from '@slagalica-app/singleplayer/actions';
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
  error$ = this.store.pipe(select(selectors.getError));
  formula$ = this.store.pipe(select(selectors.getFormula));
  points$ = this.store.pipe(select(selectors.getPoints));
  result$ = this.store.pipe(select(selectors.getResult));

  constructor(private store: Store<any>) {}

  submit() {
    this.submitted = true;
    this.store.dispatch(
      MojBrojGameActions.submitTry({
        formula: this.formula
      })
    );
  }

  change(formula: string) {
    this.formula = formula;
  }
}
