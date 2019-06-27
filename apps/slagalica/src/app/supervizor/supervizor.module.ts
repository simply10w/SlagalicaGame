import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { SupervizorPageModule } from '@slagalica-app/supervizor/containers';
import { SupervizorEffects } from '@slagalica-app/supervizor/effects';
import { routes } from './routes';

export const DEPS = [SupervizorPageModule];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EffectsModule.forFeature([SupervizorEffects]),
    DEPS
  ]
})
export class SupervizorModule {}
