import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  SingleplayerPageModule,
  GameModule
} from '@slagalica-app/singleplayer/containers';
import { SingleplayerEffects } from '@slagalica-app/singleplayer/effects';
import { reducers } from '@slagalica-app/singleplayer/reducers';
import { routes } from './routes';
import { StoreModule } from '@ngrx/store';
export const DEPS = [SingleplayerPageModule, GameModule];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('singleplayer', reducers),
    EffectsModule.forFeature([SingleplayerEffects]),
    DEPS
  ]
})
export class SingleplayerModule {}
