import { createAction, props } from '@ngrx/store';
import { LoginDto, RegisterDto } from '@slagalica/data';

export const login = createAction(
  '[Landing Page] Login',
  props<{ login: LoginDto }>()
);

export const register = createAction(
  '[Landing Page] Register',
  props<{ register: RegisterDto }>()
);
