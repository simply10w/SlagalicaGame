import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [SharedModule],
  exports: [ResetPasswordComponent]
})
export class ResetPasswordModule {}
