import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from '@slagalica-app/auth/auth.module';
import { CoreModule } from '@slagalica-app/core';
import { AppComponent } from '@slagalica-app/core/containers';
import { HomePageModule } from '@slagalica-app/home-page/home-page.module';
import { metaReducers, ROOT_REDUCERS } from '@slagalica-app/reducers';
import { routes } from '@slagalica-app/routes';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers
      // runtimeChecks: {
      //   strictStateImmutability: true,
      //   strictActionImmutability: true,
      //   strictStateSerializability: true,
      //   strictActionSerializability: true
      // }
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store App',
      logOnly: !environment.production
    }),
    CoreModule,
    AuthModule,
    HomePageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
