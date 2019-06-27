import { Routes } from '@angular/router';
import { PlayerPageComponent } from './containers/player-page/player-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PlayerPageComponent,
    data: { title: 'Player Page' }
  }
];
