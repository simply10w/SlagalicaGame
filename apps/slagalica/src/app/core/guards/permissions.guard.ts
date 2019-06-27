import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router
} from '@angular/router';
import * as fromAuth from '@slagalica-app/auth/reducers';

import { Observable } from 'rxjs';
import { map, mapTo, take, tap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { UserType } from '@slagalica/data';

interface RouteData {
  permissions?: UserType[];
}

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate, CanActivateChild {
  user$ = this.store.pipe(select(fromAuth.getUser));

  constructor(private store: Store<any>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._protectRoute(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    return this._protectRoute(route);
  }

  hasPermission(routePermissions: UserType[]): Observable<boolean> {
    return this.user$.pipe(
      map(user => {
        if (!routePermissions || routePermissions.length === 0) return true;
        if (!user) return false;
        return routePermissions.includes(user.type);
      })
    );
  }

  private _protectRoute(route: ActivatedRouteSnapshot) {
    return this.evaluateRoutePermissions(route.data).pipe(take(1));
  }

  private evaluateRoutePermissions(data: RouteData) {
    const routePermissions = data && data.permissions;
    return this.hasPermission(routePermissions).pipe(
      tap(hasPermission => {
        if (!hasPermission) {
          console.log('Does not have permission.');
          this.router.navigate(['/']);
        }
      }),
      mapTo(true)
    );
  }
}
