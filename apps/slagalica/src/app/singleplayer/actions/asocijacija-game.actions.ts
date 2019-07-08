import { createAction, props } from '@ngrx/store';

export const openTile = createAction(
  '[SinglePlayer/Game/Asocijacija] Open Tile',
  props<{ tile: number }>()
);

export const solveGroup = createAction(
  '[SinglePlayer/Game/Asocijacija] Solve Group',
  props<{ group: number; solution: string }>()
);

export const solveGame = createAction(
  '[SinglePlayer/Game/Asocijacija] Solve Game',
  props<{ solution: string }>()
);
