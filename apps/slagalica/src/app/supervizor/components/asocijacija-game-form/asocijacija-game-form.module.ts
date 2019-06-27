import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';

import { AsocijacijaGameFormComponent } from './asocijacija-game-form.component';
import { SolutionInputComponent } from './solution-input.component';
import { GroupLetterPipePipe } from './group-letter.pipe';

@NgModule({
  imports: [SharedModule],
  declarations: [
    AsocijacijaGameFormComponent,
    SolutionInputComponent,
    GroupLetterPipePipe
  ],
  exports: [AsocijacijaGameFormComponent]
})
export class AsocijacijaGameFormModule {}
