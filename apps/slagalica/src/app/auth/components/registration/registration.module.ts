import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [SharedModule],
  exports: [RegistrationComponent]
})
export class RegistrationModule {}
