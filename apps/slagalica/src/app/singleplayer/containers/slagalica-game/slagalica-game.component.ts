import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SlagalicaGameActions } from '@slagalica-app/singleplayer/actions';
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
  word$ = this.store.pipe(select(selectors.getWord));
  points$ = this.store.pipe(select(selectors.getPoints));
  error$ = this.store.pipe(select(selectors.getError));

  constructor(private store: Store<any>) {}

  submit() {
    this.submitted = true;
    this.store.dispatch(
      SlagalicaGameActions.submitTry({
        word: this.word
      })
    );
  }

  change(word: string) {
    this.word = word;
  }
}
