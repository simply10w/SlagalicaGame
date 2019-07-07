import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/multiplayer/reducers';

@Component({
  selector: 'sla-finished-game',
  templateUrl: 'finished-game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinishedGameComponent {
  winner$ = this.store.pipe(select(fromPlayer.getWinner));
  constructor(private store: Store<any>) {}
}
