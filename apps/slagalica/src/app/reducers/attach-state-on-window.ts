import { ActionReducer } from '@ngrx/store';

// console.log all actions
export function attachStateOnWindow(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    const result = reducer(state, action);
    window['__STATE__'] = result;
    return result;
  };
}
