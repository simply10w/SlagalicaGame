import { createAction, props } from '@ngrx/store';

export const openTile = createAction(
  '[MultiPlayer/Game/Asocijacija] Open Tile',
  props<{ tile: number }>()
);

export const solveGroup = createAction(
  '[MultiPlayer/Game/Asocijacija] Solve Group',
  props<{ group: number; solution: string }>()
);

export const solveGame = createAction(
  '[MultiPlayer/Game/Asocijacija] Solve Game',
  props<{ solution: string }>()
);
