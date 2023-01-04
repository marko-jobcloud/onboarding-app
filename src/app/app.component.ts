import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './container/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsersComponent, RouterOutlet],
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
