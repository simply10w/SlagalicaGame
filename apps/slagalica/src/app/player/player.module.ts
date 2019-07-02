import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { PlayerPageModule, GameModule } from '@slagalica-app/player/containers';
import { PlayerEffects } from '@slagalica-app/player/effects';
import { reducers } from '@slagalica-app/player/reducers';
import { routes } from './routes';
import { StoreModule } from '@ngrx/store';
export const DEPS = [PlayerPageModule, GameModule];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('player', reducers),
    EffectsModule.forFeature([PlayerEffects]),
    DEPS
  ]
})
export class PlayerModule {}
