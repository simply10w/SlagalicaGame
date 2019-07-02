import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  EffectNotification,
  ofType,
  OnRunEffects
} from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AuthActions, AuthApiActions } from '@slagalica-app/auth/actions';
import * as fromAuth from '@slagalica-app/auth/reducers';
import {
  PlayerActions,
  PlayerApiActions,
  PlayerPageActions
} from '@slagalica-app/player/actions';
import { PlayerService } from '@slagalica-app/player/services';
import { UserType } from '@slagalica/data';
import { Observable, of, timer, NEVER, combineLatest, EMPTY } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  switchMap,
  takeUntil,
  withLatestFrom,
  tap
} from 'rxjs/operators';
import { Room } from 'colyseus.js';

@Injectable()
export class PlayerEffects implements OnRunEffects {
  private user$ = this.store.pipe(select(fromAuth.getUser));
  private token$ = this.store.pipe(select(fromAuth.getToken));
  private roomOptions$ = combineLatest(this.user$, this.token$).pipe(
    map(([user, token]) => ({
      token,
      userId: user._id,
      userName: user.userName
    }))
  );
  private room: Room;

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.createRoom),
      withLatestFrom(this.roomOptions$),
      switchMap(([_, options]) => {
        if (!this.room) {
          return this.playerService.createRoom(options).pipe(
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
      withLatestFrom(this.roomOptions$),
      switchMap(([action, options]) => {
        if (!this.room) {
          return this.playerService.joinRoom(action.roomId, options).pipe(
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
    room.onStateChange.add((...params) => {
      console.log('onState:', params);
    });
    room.onMessage.add((message: GameMessage) => {
      switch (message.type) {
        case GameEvent.GameStarted:
          {
            console.log('GAME STARTED!');
          }
          break;
        default: {
          console.log('onMessage:', message);
        }
      }
    });
    // room.onJoin.add(() => {
    //   // listen to patches coming from the server
    //   room.state.players.onAdd = (player, sessionId) => {
    //     console.log('CLIENT ADD PLAYER', player);
    //   };
    //   room.state.players.onRemove = (player, sessionId) => {
    //     console.log('CLIENT REMOVE PLAYER', player);
    //   };
    //   room.state.players.onChange = (player, sessionId) => {
    //     console.log('CLIENT STATE CHANGE', player);
    //   };
    // });
  }

  private _cleanup() {
    if (this.room) {
      this.room.removeAllListeners();
      this.room.leave();
      this.room = null;
    }
  }
}

const enum GameEvent {
  GameStarted = 'game_started'
}

interface GameMessage {
  type: GameEvent;
  payload: any;
}
