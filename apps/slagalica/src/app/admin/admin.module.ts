import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdminPageModule } from '@slagalica-app/admin/containers';
import { AdminEffects } from '@slagalica-app/admin/effects';
import { reducers } from '@slagalica-app/admin/reducers';
import { SharedModule } from '@slagalica-app/shared';
import { routes } from './routes';

export const DEPS = [AdminPageModule];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature([AdminEffects]),
    DEPS
  ]
})
export class AdminModule {}
