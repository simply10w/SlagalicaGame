import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
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
import {
  LoginDto,
  RegisterDto,
  UserType,
  ResetPasswordDto
} from '@slagalica/data';
import { getErrorMessage } from '@slagalica/common';

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
          catchError(response =>
            of(
              AuthApiActions.loginFailure({ error: getErrorMessage(response) })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(({ user }) => {
          switch (user.type) {
            case UserType.Admin:
              return this.router.navigate(['/admin']);
            case UserType.Igrac:
              return this.router.navigate(['/home']);
            case UserType.Supervizor:
              return this.router.navigate(['/supervizor']);
          }
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
          map(response => response.user),
          map(user => AuthApiActions.registerSuccess({ user })),
          catchError(response =>
            of(
              AuthApiActions.registerFailure({
                error: getErrorMessage(response)
              })
            )
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.registerSuccess),
        tap(({ user }) => {
          this.snackBar.open(
            `Registration request created for ${user.userName}`
          );
        })
      ),
    { dispatch: false }
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandingPageActions.resetPassword),
      map(action => action.resetPassword),
      exhaustMap((resetPassword: ResetPasswordDto) =>
        this.authApi.resetPassword(resetPassword).pipe(
          map(response => response.user),
          map(user => AuthApiActions.resetPasswordSuccess({ user })),
          catchError(response =>
            of(
              AuthApiActions.resetPasswordFailure({
                error: getErrorMessage(response)
              })
            )
          )
        )
      )
    )
  );

  resetPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.resetPasswordSuccess),
        tap(({ user }) => {
          this.snackBar.open(
            `Password reset successufully for ${user.userName}`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authApi: AuthApiService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
}
