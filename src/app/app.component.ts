import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhoneDirectoryComponent } from './phone-directory/phone-directory.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PhoneDirectoryComponent],
})
export class AppComponent {
  title = 'oracle-phone-directory';
}
