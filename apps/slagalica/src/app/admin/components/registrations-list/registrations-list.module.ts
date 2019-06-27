import { NgModule } from '@angular/core';

import { RegistrationsListComponent } from './registrations-list.component';
import { SharedModule } from '@slagalica-app/shared';

@NgModule({
  imports: [SharedModule],
  exports: [RegistrationsListComponent],
  declarations: [RegistrationsListComponent]
})
export class RegistrationsListModule {}
