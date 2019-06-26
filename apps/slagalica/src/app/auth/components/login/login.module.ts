import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule],
  exports: [LoginComponent]
})
export class LoginModule {}
