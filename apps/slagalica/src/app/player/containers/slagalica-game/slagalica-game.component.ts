import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { SlagalicaGameActions } from '@slagalica-app/player/actions';

@Component({
  selector: 'sla-slagalica-game',
  templateUrl: 'slagalica-game.component.html',
  styleUrls: ['./slagalica-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlagalicaGameComponent {
  word: string;
  submitted: boolean;

  amIRed$ = this.store.pipe(select(fromPlayer.getAmIRed));
  amIBlue$ = this.store.pipe(select(fromPlayer.getAmIBlue));

  game$ = this.store.pipe(select(fromPlayer.getSlagalicaGame));

  constructor(private store: Store<any>) {}

  submit() {
    this.submitted = true;
    this.store.dispatch(
      SlagalicaGameActions.submitPlayerTry({
        word: this.word
      })
    );
  }

  change(word: string) {
    this.word = word;
  }
}
