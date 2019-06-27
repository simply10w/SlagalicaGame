import { createAction, props } from '@ngrx/store';
import { LoginDto, RegisterDto, ResetPasswordDto } from '@slagalica/data';

export const login = createAction(
  '[Landing Page] Login',
  props<{ login: LoginDto }>()
);

export const register = createAction(
  '[Landing Page] Register',
  props<{ register: RegisterDto }>()
);

export const resetPassword = createAction(
  '[Landing Page] Reset Password',
  props<{ resetPassword: ResetPasswordDto }>()
);
