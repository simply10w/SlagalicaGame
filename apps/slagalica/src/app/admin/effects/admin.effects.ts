import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, concatMap, map, tap } from 'rxjs/operators';
import {
  AdminPageActions,
  AdminApiActions
} from '@slagalica-app/admin/actions';
import { AdminApiService } from '@slagalica-app/admin/services';

@Injectable()
export class AdminEffects {
  getPendingUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminPageActions.getPendingUsers),
      switchMap(() =>
        this.adminApi.getPendingUsers().pipe(
          map(response => response.users),
          map(users => AdminApiActions.getPendingUsersSuccess({ users })),
          catchError(error =>
            of(AdminApiActions.getPendingUsersFailure({ error }))
          )
        )
      )
    )
  );

  acceptPendingUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminPageActions.acceptPendingUser),
      concatMap(({ user: userId }) =>
        this.adminApi.acceptPendingUser(userId).pipe(
          map(response => response.user),
          map(user =>
            AdminApiActions.acceptPendingUserSuccess({ user: userId })
          ),
          catchError(error =>
            of(AdminApiActions.getPendingUsersFailure({ error }))
          )
        )
      )
    )
  );

  rejectPendingUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminPageActions.rejectPendingUser),
      concatMap(({ user: userId }) =>
        this.adminApi.rejectPendingUser(userId).pipe(
          map(() => AdminApiActions.rejectPendingUserSuccess({ user: userId })),
          catchError(error =>
            of(AdminApiActions.getPendingUsersFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private adminApi: AdminApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
