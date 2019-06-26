import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { LandingPageComponent } from './landing-page.component';
import { LoginModule } from './login';
import { RegistrationModule } from './registration';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [SharedModule, LoginModule, RegistrationModule],
  exports: [LandingPageComponent]
})
export class LandingPageModule {}
