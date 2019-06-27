import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { SupervizorPageComponent } from './supervizor-page.component';
import { WordGameFormModule } from '../components/word-game-form';
import { SpojnicaGameFormModule } from '../components/spojnica-game-form';
import { AsocijacijaGameFormModule } from '../components/asocijacija-game-form';

@NgModule({
  declarations: [SupervizorPageComponent],
  imports: [
    SharedModule,
    SpojnicaGameFormModule,
    WordGameFormModule,
    AsocijacijaGameFormModule
  ],
  exports: [SupervizorPageComponent]
})
export class SupervizorPageModule {}
