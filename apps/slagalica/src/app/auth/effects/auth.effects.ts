import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  LandingPageActions,
  AuthActions,
  AuthApiActions
} from '@slagalica-app/auth/actions';
import { AuthApiService } from '@slagalica-app/auth/services';
import { LogoutConfirmationDialogComponent } from '@slagalica-app/auth/components';
import { LoginDto, RegisterDto, UserType } from '@slagalica/data';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandingPageActions.login),
      map(action => action.login),
      exhaustMap((auth: LoginDto) =>
        this.authApi.login(auth).pipe(
          map(response => response.user),
          map(user => AuthApiActions.loginSuccess({ user })),
          catchError(error => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(({ user }) => {
          /** TODO:  */
          if (user.type === UserType.Admin) {
            //
          }
          this.router.navigate(['/admin']);
        })
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginRedirect, AuthActions.logout),
        tap(authed => {
          this.router.navigate(['/landing-page']);
        })
      ),
    { dispatch: false }
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map(result =>
        result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandingPageActions.register),
      map(action => action.register),
      exhaustMap((registerDto: RegisterDto) =>
        this.authApi.register(registerDto).pipe(
          map(user => AuthApiActions.registerSuccess({ user })),
          catchError(error => of(AuthApiActions.registerFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authApi: AuthApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
