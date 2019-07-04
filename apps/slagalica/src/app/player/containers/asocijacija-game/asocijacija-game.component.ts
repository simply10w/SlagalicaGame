import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { map, withLatestFrom } from 'rxjs/operators';
import { PlayerRole } from '@slagalica/data';
import { times } from 'lodash';
// import { MojBrojGameActions } from '@slagalica-app/player/actions';

@Component({
  selector: 'sla-asocijacija-game',
  templateUrl: 'asocijacija-game.component.html',
  styleUrls: ['./asocijacija-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsocijacijaGameComponent {
  amIRed$ = this.store.pipe(select(fromPlayer.getAmIRed));
  amIBlue$ = this.store.pipe(select(fromPlayer.getAmIBlue));

  game$ = this.store.pipe(select(fromPlayer.getSkockoGame));

  constructor(private store: Store<any>) {}

  GROUPS = times(4);
  HINTS = times(4);

  submit() {
    // this.submitted = true;
    // this.store.dispatch(
    //   MojBrojGameActions.submitPlayerTry({
    //     formula: this.formula
    //   })
    // );
  }

  change(formula: string) {
    // this.formula = formula;
  }
}
