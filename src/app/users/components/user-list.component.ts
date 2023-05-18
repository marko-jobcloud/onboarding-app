import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { User } from '../user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <ul>
      <li *ngFor="let user of users">
        <a routerLink="/users/edit/{{ user.id }}">{{
          user.firstName + ' ' + user.lastName
        }}</a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users: User[] = [];
}
