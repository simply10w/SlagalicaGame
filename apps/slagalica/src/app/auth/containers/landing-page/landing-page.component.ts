import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  AuthApiActions,
  LandingPageActions
} from '@slagalica-app/auth/actions';
import * as fromAuth from '@slagalica-app/auth/reducers';
import { LoginDto, RegisterDto, ResetPasswordDto } from '@slagalica/data';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'sla-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  user$ = this.store.pipe(select(fromAuth.getUser));

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
