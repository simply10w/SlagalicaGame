import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page.component';
import { SharedModule } from '@slagalica-app/shared';

@NgModule({
  imports: [SharedModule],
  exports: [HomePageComponent],
  declarations: [HomePageComponent],
  providers: []
})
export class HomePageModule {}
