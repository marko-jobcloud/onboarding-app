import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li
        *ngFor="let user of users"
        [class.active]="user.id === selectedUserId"
        (click)="selectedUserIdChange.emit(user.id)"
      >
        {{ user.firstName + ' ' + user.lastName }}
      </li>
    </ul>
  `,
  styles: [
    `
      li {
        cursor: pointer;
      }

      .active {
        background-color: aqua;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() selectedUserId: number | null = null;
  @Output() selectedUserIdChange = new EventEmitter<number>();
}
