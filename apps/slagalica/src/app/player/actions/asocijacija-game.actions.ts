import { createAction, props } from '@ngrx/store';

export const openTile = createAction(
  '[Game/Asocijacija] Open Tile',
  props<{ tile: number }>()
);

export const solveGroup = createAction(
  '[Game/Asocijacija] Solve Group',
  props<{ group: number; solution: string }>()
);

export const solveGame = createAction(
  '[Game/Asocijacija] Solve Game',
  props<{ solution: string }>()
);
