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
  mojBrojGameOptions$ = this.store.pipe(
    select(fromPlayer.getMojBrojGameOptions)
  );

  mojBrojGameGoal$ = this.store.pipe(select(fromPlayer.getMojBrojGameGoal));

  redPlayerTry$ = this.store.pipe(select(fromPlayer.getRedPlayerMojBrojTry));

  bluePlayerTry$ = this.store.pipe(select(fromPlayer.getBluePlayerMojBrojTry));

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
