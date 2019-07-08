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
  AsocijacijaGameActions,
  GameActions,
  MojBrojGameActions,
  PlayerApiActions,
  PlayerPageActions,
  SkockoGameActions,
  SlagalicaGameActions,
  SpojniceGameActions
} from '@slagalica-app/singleplayer/actions';
import * as fromPlayer from '@slagalica-app/singleplayer/reducers';
import { SingleplayerService } from '@slagalica-app/singleplayer/services';
import {
  AsocijacijaOpenMessage,
  AsocijacijaSolveGameMessage,
  AsocijacijaSolveGroupMessage,
  MojBrojMessage,
  SkockoMessage,
  SlagalicaMessage,
  SpojnicaGuessMessage,
  UserType
} from '@slagalica/data';
import { serializeState } from '@slagalica/ui';
import { Room, Schema } from 'colyseus.js';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  exhaustMap,
  filter,
  map,
  skip,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
  catchError
} from 'rxjs/operators';

@Injectable()
export class SingleplayerEffects implements OnRunEffects {
  private user$ = this.store.pipe(select(fromAuth.getUser));
  private player$ = this.store.pipe(select(fromPlayer.getPlayerInfo));
  private room: Room;
  private stateChangeUpdate = new BehaviorSubject<Schema>(null);

  loadSingleResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.loadSingleResults),
      switchMap(() =>
        this.playerService.loadSingleResults().pipe(
          map(response => response.results),
          map(results =>
            PlayerApiActions.loadSingleResultsSuccess({ results })
          ),
          catchError(error =>
            of(PlayerApiActions.loadSingleResultsFailure({ error }))
          )
        )
      )
    )
  );

  loadMultiResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.loadMultiResults),
      switchMap(() =>
        this.playerService.loadMultiResults().pipe(
          map(response => response.results),
          map(results => PlayerApiActions.loadMultiResultsSuccess({ results })),
          catchError(error =>
            of(PlayerApiActions.loadMultiResultsFailure({ error }))
          )
        )
      )
    )
  );

  createGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.createGame),
      withLatestFrom(this.player$),
      switchMap(([_, player]) => {
        if (!this.room) {
          return this.playerService.createRoom(player).pipe(
            tap(room => {
              this.room = room;
              this._connectListeners(this.room);
            }),
            map(() => PlayerApiActions.createGameSuccess())
          );
        } else {
          return of(
            PlayerApiActions.createGameFailure({
              error: 'Room already created.'
            })
          );
        }
      })
    )
  );

  leaveRoom$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.leaveGame),
        tap(() => this._leaveGame())
      ),
    { dispatch: false }
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
        ofType(SlagalicaGameActions.submitTry),
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
        ofType(MojBrojGameActions.submitTry),
        tap(({ formula }) =>
          this.room.send({
            formula
          } as MojBrojMessage)
        )
      ),
    { dispatch: false }
  );

  /**
   * Spojnica game
   */

  spojnicaGuess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SpojniceGameActions.guess),
        tap(({ guess }) =>
          this.room.send({
            type: 'guess_spojnica',
            guess
          } as SpojnicaGuessMessage)
        )
      ),
    { dispatch: false }
  );

  /**
   * Asocijacija game
   */
  asocijacijaOpenTile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AsocijacijaGameActions.openTile),
        tap(({ tile }) =>
          this.room.send({
            type: 'open',
            open: tile
          } as AsocijacijaOpenMessage)
        )
      ),
    { dispatch: false }
  );

  asocijacijaSolveGroup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AsocijacijaGameActions.solveGroup),
        tap(({ group, solution }) =>
          this.room.send({
            type: 'solve_group',
            group,
            solution
          } as AsocijacijaSolveGroupMessage)
        )
      ),
    { dispatch: false }
  );

  asocijacijaSolveGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AsocijacijaGameActions.solveGame),
        tap(({ solution }) =>
          this.room.send({
            type: 'solve_game',
            solution
          } as AsocijacijaSolveGameMessage)
        )
      ),
    { dispatch: false }
  );

  /**
   * Skocko guess
   */
  skockoGuess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SkockoGameActions.guess),
        tap(({ sequence }) =>
          this.room.send({
            sequence
          } as SkockoMessage)
        )
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private playerService: SingleplayerService
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

  private _leaveGame() {
    if (this.room) {
      this.room.removeAllListeners();
      this.room.leave();
      this.room = null;
    }
  }

  private _cleanup() {
    this._leaveGame();
  }
}
