import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';

import { SpojnicaGameFormComponent } from './spojnica-game-form.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SpojnicaGameFormComponent],
  exports: [SpojnicaGameFormComponent]
})
export class SpojnicaGameFormModule {}
