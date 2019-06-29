import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LogoutConfirmationModule } from '@slagalica-app/auth/components';
import { LandingPageModule } from '@slagalica-app/auth/containers';
import { AuthEffects } from '@slagalica-app/auth/effects';
import { authReducer, landingPageReducer } from '@slagalica-app/auth/reducers';
import { AuthInterceptor } from '@slagalica-app/auth/interceptors';
import { SharedModule } from '@slagalica-app/shared';
import { routes } from './routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const DEPS = [LandingPageModule, LogoutConfirmationModule];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('landingPage', landingPageReducer),
    EffectsModule.forFeature([AuthEffects]),
    DEPS
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
