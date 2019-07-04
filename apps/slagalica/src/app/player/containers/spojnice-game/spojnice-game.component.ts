import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { SpojniceGameActions } from '@slagalica-app/player/actions';

@Component({
  selector: 'sla-spojnice-game',
  templateUrl: 'spojnice-game.component.html',
  styleUrls: ['./spojnice-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpojniceGameComponent {
  amIRed$ = this.store.pipe(select(fromPlayer.getAmIRed));
  amIBlue$ = this.store.pipe(select(fromPlayer.getAmIBlue));
  game$ = this.store.pipe(select(fromPlayer.getSpojniceGame));

  constructor(private store: Store<any>) {}

  guess() {
    this.store.dispatch(
      SpojniceGameActions.guess({
        guess: 'teest'
      })
    );
  }

  skip() {
    this.store.dispatch(SpojniceGameActions.skip());
  }
}
