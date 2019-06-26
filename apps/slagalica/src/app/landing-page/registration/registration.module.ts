import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [SharedModule],
  exports: [RegistrationComponent]
})
export class RegistrationModule {}
