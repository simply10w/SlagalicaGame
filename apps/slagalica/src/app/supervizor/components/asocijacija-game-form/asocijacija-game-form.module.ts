import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';

import { AsocijacijaGameFormComponent } from './asocijacija-game-form.component';

@NgModule({
  imports: [SharedModule],
  declarations: [AsocijacijaGameFormComponent],
  exports: [AsocijacijaGameFormComponent]
})
export class AsocijacijaGameFormModule {}
