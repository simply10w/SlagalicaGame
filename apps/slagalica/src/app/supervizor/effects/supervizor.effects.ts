import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  SpojnicaGameApiActions,
  SupervizorPageActions,
  WordsGameApiActions
} from '@slagalica-app/supervizor/actions';
import {
  SpojnicaGameApiService,
  WordsGameApiService
} from '@slagalica-app/supervizor/services';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

@Injectable()
export class SupervizorEffects {
  addWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupervizorPageActions.addWord),
      concatMap(({ word }) =>
        this.wordsGameApi.addWord(word).pipe(
          map(response => response.word),
          map(addedWord =>
            WordsGameApiActions.addWordSuccess({ word: addedWord })
          ),
          catchError(error =>
            of(WordsGameApiActions.addWordFailure({ error, word }))
          )
        )
      )
    )
  );

  onWordAdded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WordsGameApiActions.addWordSuccess),
        tap(({ word }) =>
          this.snackBar.open(`Added to words game word: ${word.word}`)
        )
      ),
    { dispatch: false }
  );

  onWordAddFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WordsGameApiActions.addWordFailure),
        tap(({ word }) => this.snackBar.open(`Failed to add word: ${word}`))
      ),
    { dispatch: false }
  );

  addSpojnicaGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupervizorPageActions.addSpojnicaGame),
      concatMap(({ game }) =>
        this.spojnicaGameApi.addSpojnicaGame(game).pipe(
          map(response => response.game),
          map(addedGame =>
            SpojnicaGameApiActions.addSpojnicaGameSuccess({ game: addedGame })
          ),
          catchError(error =>
            of(
              SpojnicaGameApiActions.addSpojnicaGameFailure({
                error,
                game: game.description
              })
            )
          )
        )
      )
    )
  );

  onSpojnicaGameAdded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SpojnicaGameApiActions.addSpojnicaGameSuccess),
        tap(({ game }) =>
          this.snackBar.open(`Added spojnica game: ${game.description}`)
        )
      ),
    { dispatch: false }
  );

  onSpojnicaGameAddFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SpojnicaGameApiActions.addSpojnicaGameFailure),
        tap(({ game }) =>
          this.snackBar.open(`Failed to add spojnica game: ${game}`)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private wordsGameApi: WordsGameApiService,
    private spojnicaGameApi: SpojnicaGameApiService,
    private snackBar: MatSnackBar
  ) {}
}
