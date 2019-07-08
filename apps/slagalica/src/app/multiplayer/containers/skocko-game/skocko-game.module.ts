import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { SkockoGameComponent } from './skocko-game.component';
import { MainPlayerTriesPipe, SecondPlayerTriesPipe } from './tries.pipe';

@NgModule({
  imports: [SharedModule],
  exports: [SkockoGameComponent],
  declarations: [
    SkockoGameComponent,
    MainPlayerTriesPipe,
    SecondPlayerTriesPipe
  ]
})
export class SkockoGameModule {}
