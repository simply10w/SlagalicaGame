import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { GameHeaderModule } from '@slagalica-app/multiplayer/components';
import { GameComponent } from './game.component';
import { SlagalicaGameModule } from '../slagalica-game';
import { MojBrojGameModule } from '../moj-broj-game';
import { SkockoGameModule } from '../skocko-game';
import { AsocijacijaGameModule } from '../asocijacija-game';
import { SpojniceGameModule } from '../spojnice-game';
import { FinishedGameModule } from '../finished-game';

@NgModule({
  imports: [
    SharedModule,
    SlagalicaGameModule,
    MojBrojGameModule,
    SkockoGameModule,
    AsocijacijaGameModule,
    SpojniceGameModule,
    GameHeaderModule,
    FinishedGameModule
  ],
  exports: [GameComponent],
  declarations: [GameComponent]
})
export class GameModule {}
