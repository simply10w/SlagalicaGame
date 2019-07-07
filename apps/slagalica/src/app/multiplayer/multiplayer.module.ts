import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  MultiplayerPageModule,
  GameModule
} from '@slagalica-app/multiplayer/containers';
import { MultiplayerEffects } from '@slagalica-app/multiplayer/effects';
import { reducers } from '@slagalica-app/multiplayer/reducers';
import { routes } from './routes';
import { StoreModule } from '@ngrx/store';
export const DEPS = [MultiplayerPageModule, GameModule];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('multiplayer', reducers),
    EffectsModule.forFeature([MultiplayerEffects]),
    DEPS
  ]
})
export class MultiplayerModule {}
