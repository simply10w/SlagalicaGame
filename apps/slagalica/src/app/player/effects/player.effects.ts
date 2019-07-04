import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  EffectNotification,
  ofType,
  OnRunEffects
} from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AuthActions } from '@slagalica-app/auth/actions';
import * as fromAuth from '@slagalica-app/auth/reducers';
import {
  MojBrojGameActions,
  PlayerActions,
  PlayerApiActions,
  PlayerPageActions,
  SlagalicaGameActions
} from '@slagalica-app/player/actions';
import * as fromPlayer from '@slagalica-app/player/reducers';
import { PlayerService } from '@slagalica-app/player/services';
import { MojBrojMessage, SlagalicaMessage, UserType } from '@slagalica/data';
import { serializeState } from '@slagalica/ui';
import { Room, Schema } from 'colyseus.js';
import { BehaviorSubject, EMPTY, Observable, of, timer } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  skip,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';

@Injectable()
export class PlayerEffects implements OnRunEffects {
  private user$ = this.store.pipe(select(fromAuth.getUser));
  private player$ = this.store.pipe(select(fromPlayer.getPlayer));
  private room: Room;
  private stateChangeUpdate = new BehaviorSubject<Schema>(null);

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.createRoom),
      withLatestFrom(this.player$),
      switchMap(([_, player]) => {
        if (!this.room) {
          return this.playerService.createRoom(player).pipe(
            tap(room => {
              this.room = room;
              this._connectListeners(this.room);
            }),
            map(room => PlayerApiActions.createRoomSuccess())
          );
        } else {
          return of(
            PlayerApiActions.createRoomFailure({
              error: 'Room already created.'
            })
          );
        }
      })
    )
  );

  joinRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.joinRoom),
      withLatestFrom(this.player$),
      switchMap(([action, player]) => {
        if (!this.room) {
          return this.playerService.joinRoom(action.roomId, player).pipe(
            tap(room => {
              this.room = room;
              this._connectListeners(this.room);
            }),
            map(room => PlayerApiActions.joinRoomSuccess())
          );
        } else {
          return of(
            PlayerApiActions.createRoomFailure({
              error: 'Already in a room.'
            })
          );
        }
      })
    )
  );

  getAvailableRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.getAvailableRooms),
      switchMap(() =>
        this.playerService.getAvailableRooms().pipe(
          map(rooms => PlayerApiActions.getAvailableRoomsSuccess({ rooms })),
          catchError(error =>
            of(PlayerApiActions.getAvailableRoomsFailure({ error }))
          )
        )
      )
    )
  );

  refreshAvailableRooms$ = createEffect(() =>
    timer(2000, 2000).pipe(
      switchMap(() => {
        /** we dont want to get rooms if there is already a room created */
        if (!this.room) {
          return of(PlayerActions.getAvailableRooms());
        } else {
          return EMPTY;
        }
      })
    )
  );

  cleanupOnLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutConfirmation),
        tap(_ => this._cleanup())
      ),
    { dispatch: false }
  );

  listenStateChanges$ = createEffect(() =>
    this.stateChangeUpdate.pipe(
      skip(1),
      map(serializeState),
      map(state => PlayerApiActions.stateChangeUpdate({ newState: state }))
    )
  );

  /**
   * Slagalica Game
   */
  slagalicaGameSubmitTry$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SlagalicaGameActions.submitPlayerTry),
        tap(({ word }) =>
          this.room.send({
            word
          } as SlagalicaMessage)
        )
      ),
    { dispatch: false }
  );

  /**
   * Moj Broj Game
   */
  mojBrojGameSubmitTry$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MojBrojGameActions.submitPlayerTry),
        tap(({ formula }) =>
          this.room.send({
            formula
          } as MojBrojMessage)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private playerService: PlayerService
  ) {}

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.user$.pipe(
      filter(user => !!user && user.type === UserType.Igrac),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(
            this.actions$.pipe(
              ofType(AuthActions.logoutConfirmation),
              tap(() => this._cleanup())
            )
          )
        )
      )
    );
  }

  private _connectListeners(room: Room) {
    room.onStateChange.add(stateChange => {
      this.stateChangeUpdate.next(stateChange);
    });
  }

  private _cleanup() {
    if (this.room) {
      this.room.removeAllListeners();
      this.room.leave();
      this.room = null;
    }
  }
}
