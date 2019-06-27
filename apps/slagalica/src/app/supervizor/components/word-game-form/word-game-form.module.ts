import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { WordGameFormComponent } from './word-game-form.component';

@NgModule({
  imports: [SharedModule],
  declarations: [WordGameFormComponent],
  exports: [WordGameFormComponent]
})
export class WordGameFormModule {}
