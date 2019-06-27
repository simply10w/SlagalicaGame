import { NgModule } from '@angular/core';
import {
  LoginModule,
  RegistrationModule,
  ResetPasswordModule
} from '@slagalica-app/auth/components';
import { SharedModule } from '@slagalica-app/shared';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [SharedModule, LoginModule, RegistrationModule, ResetPasswordModule],
  exports: [LandingPageComponent]
})
export class LandingPageModule {}
