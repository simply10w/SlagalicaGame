import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { PlayerPageModule } from '@slagalica-app/player/containers';
// import { SupervizorEffects } from '@slagalica-app/supervizor/effects';
import { routes } from './routes';

export const DEPS = [PlayerPageModule];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // EffectsModule.forFeature([SupervizorEffects]),
    DEPS
  ]
})
export class PlayerModule {}
