import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsersComponent],
  template: '<app-users></app-users>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
