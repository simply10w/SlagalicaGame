import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { AdminPageComponent } from './admin-page.component';
import { RegistrationsListModule } from '../components/registrations-list';
import { SearchUsersPipe } from './search-users.pipe';

@NgModule({
  declarations: [AdminPageComponent, SearchUsersPipe],
  imports: [SharedModule, RegistrationsListModule],
  exports: [AdminPageComponent]
})
export class AdminPageModule {}
