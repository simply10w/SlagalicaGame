import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { AdminPageComponent } from './admin-page.component';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [SharedModule],
  exports: [AdminPageComponent]
})
export class AdminPageModule {}
