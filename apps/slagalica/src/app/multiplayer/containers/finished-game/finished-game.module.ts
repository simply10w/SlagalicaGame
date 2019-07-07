import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';

import { FinishedGameComponent } from './finished-game.component';

@NgModule({
  imports: [SharedModule],
  exports: [FinishedGameComponent],
  declarations: [FinishedGameComponent]
})
export class FinishedGameModule {}
