import { NgModule } from '@angular/core';
import { ClButtonComponent } from './components/cl-button/cl-button.component';
import { PopupsNotifierService } from './services/popups-notifier.service';

@NgModule({
  declarations: [ClButtonComponent],
  imports: [
  ],
  exports: [
    ClButtonComponent
  ],
  providers: [
  ],
})
export class SharedModule {}
