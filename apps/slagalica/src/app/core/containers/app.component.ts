import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthActions } from '@slagalica-app/auth/actions';
import * as fromAuth from '@slagalica-app/auth/reducers';
import { UserType } from '@slagalica/data';

@Component({
  selector: 'sla-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sla-layout>
      <sla-toolbar>
        <sla-nav-item *ngIf="!(loggedIn$ | async)">Slagalica</sla-nav-item>
        <sla-nav-item *slaHasPermission="[UserType.Admin]" routerLink="/admin"
          >Admin
        </sla-nav-item>
        <sla-nav-item
          *slaHasPermission="[UserType.Supervizor]"
          routerLink="/supervizor"
          >Supervizor
        </sla-nav-item>
        <sla-nav-item
          *slaHasPermission="[UserType.Igrac]"
          routerLink="/multiplayer"
          >Igre</sla-nav-item
        >
        <sla-nav-item
          *slaHasPermission="[
            UserType.Igrac,
            UserType.Admin,
            UserType.Supervizor
          ]"
          routerLink="home"
          >Home
        </sla-nav-item>
        <sla-nav-item
          [routerLink]="null"
          (navigate)="logout()"
          *ngIf="(loggedIn$ | async)"
          >Sign Out
        </sla-nav-item>
      </sla-toolbar>
      <router-outlet></router-outlet>
    </sla-layout>
  `
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  UserType = UserType;

  constructor(private store: Store<any>) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }
}
