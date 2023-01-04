import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ul>
      <li
        *ngFor="let user of users"
        routerLink="/update-user"
        [queryParams]="{ id: user.id }"
      >
        {{ user.firstName + ' ' + user.lastName }}
      </li>
    </ul>
  `,
  styles: [
    `
      li {
        cursor: pointer;
        &:hover {
          background-color: aqua;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users: User[] = [];
}
