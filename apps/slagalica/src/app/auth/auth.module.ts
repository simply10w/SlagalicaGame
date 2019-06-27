import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LogoutConfirmationModule } from '@slagalica-app/auth/components';
import { LandingPageModule } from '@slagalica-app/auth/containers';
import { AuthEffects } from '@slagalica-app/auth/effects';
import { authReducer, landingPageReducer } from '@slagalica-app/auth/reducers';
import { SharedModule } from '@slagalica-app/shared';
import { routes } from './routes';

export const DEPS = [LandingPageModule, LogoutConfirmationModule];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('landingPage', landingPageReducer),
    EffectsModule.forFeature([AuthEffects]),
    DEPS
  ]
})
export class AuthModule {}
