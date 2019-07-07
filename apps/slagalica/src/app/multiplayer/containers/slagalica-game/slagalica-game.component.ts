import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SlagalicaGameActions } from '@slagalica-app/multiplayer/actions';
import { selectors } from './slagalica.selectors';

@Component({
  selector: 'sla-slagalica-game',
  templateUrl: 'slagalica-game.component.html',
  styleUrls: ['./slagalica-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlagalicaGameComponent {
  word: string;
  submitted: boolean;

  letters$ = this.store.pipe(select(selectors.getLetters));

  isRedDisabled$ = this.store.pipe(select(selectors.isRedDisabled));
  redPoints$ = this.store.pipe(select(selectors.getRedPoints));
  redWord$ = this.store.pipe(select(selectors.getRedWord));
  redError$ = this.store.pipe(select(selectors.getRedError));

  isBlueDisabled$ = this.store.pipe(select(selectors.isBlueDisabled));
  blueWord$ = this.store.pipe(select(selectors.getBlueWord));
  bluePoints$ = this.store.pipe(select(selectors.getBluePoints));
  blueError$ = this.store.pipe(select(selectors.getBlueError));

  isSubmitEnabled$ = this.store.pipe(select(selectors.isSubmitEnabled));

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
