import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { AdminPageComponent } from './admin-page.component';
import { RegistrationsListModule } from '../components/registrations-list';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [SharedModule, RegistrationsListModule],
  exports: [AdminPageComponent]
})
export class AdminPageModule {}
