import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SupervizorPageActions } from '@slagalica-app/supervizor/actions';
import { SpojnicaGame } from '@slagalica/data';

@Component({
  selector: 'sla-supervizor-page',
  templateUrl: './supervizor-page.component.html',
  styleUrls: ['./supervizor-page.component.scss']
})
export class SupervizorPageComponent {
  constructor(private store: Store<any>) {}

  addWord(word: string) {
    this.store.dispatch(SupervizorPageActions.addWord({ word }));
  }

  addSpojnica(game: SpojnicaGame) {
    this.store.dispatch(SupervizorPageActions.addSpojnicaGame({ game }));
  }
}
