import { NgModule } from '@angular/core';
import { SharedModule } from '@slagalica-app/shared';
import { LogoutConfirmationDialogComponent } from './logout-confirmation.component';

@NgModule({
  imports: [SharedModule],
  exports: [LogoutConfirmationDialogComponent],
  declarations: [LogoutConfirmationDialogComponent],
  entryComponents: [LogoutConfirmationDialogComponent]
})
export class LogoutConfirmationModule {}
