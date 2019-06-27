import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginDto, RegisterDto, ResetPasswordDto } from '@slagalica/data';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '@slagalica-app/auth/reducers';
import {
  LandingPageActions,
  AuthApiActions
} from '@slagalica-app/auth/actions';
import { Actions, ofType } from '@ngrx/effects';
import { of, merge } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'sla-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  pendingLogin$ = this.store.pipe(select(fromAuth.getLoginPending));
  errorLogin$ = this.store.pipe(select(fromAuth.getLoginError));

  pendingRegister$ = this.store.pipe(select(fromAuth.getRegisterPending));
  errorRegister$ = this.store.pipe(select(fromAuth.getRegisterError));

  pendingResetPassword$ = this.store.pipe(
    select(fromAuth.getResetPasswordPending)
  );
  errorResetPassword$ = this.store.pipe(select(fromAuth.getResetPasswordError));

  selectedTab$ = this.actions$.pipe(
    ofType(AuthApiActions.resetPasswordSuccess),
    mapTo(0)
  );

  constructor(private store: Store<any>, private actions$: Actions) {}

  login(loginDto: LoginDto) {
    this.store.dispatch(LandingPageActions.login({ login: loginDto }));
  }

  register(registerDto: RegisterDto) {
    this.store.dispatch(LandingPageActions.register({ register: registerDto }));
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    this.store.dispatch(
      LandingPageActions.resetPassword({ resetPassword: resetPasswordDto })
    );
  }
}
