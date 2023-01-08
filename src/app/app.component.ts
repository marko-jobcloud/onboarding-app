import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { HomepageComponent } from './users/pages/homepage.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsersComponent, HomepageComponent, RouterModule],
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
