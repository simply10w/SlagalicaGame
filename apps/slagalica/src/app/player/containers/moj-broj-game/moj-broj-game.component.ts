import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { MojBrojGameActions } from '@slagalica-app/player/actions';

@Component({
  selector: 'sla-moj-broj-game',
  templateUrl: 'moj-broj-game.component.html',
  styleUrls: ['./moj-broj-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MojBrojGameComponent {
  formula: string;
  submitted: boolean;

  amIRed$ = this.store.pipe(select(fromPlayer.getAmIRed));
  amIBlue$ = this.store.pipe(select(fromPlayer.getAmIBlue));
  game$ = this.store.pipe(select(fromPlayer.getMojBrojGame));

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
