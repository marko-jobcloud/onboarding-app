import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UsersStore } from './users.store';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Users</h1>

    <input type="text" placeholder="Search..." [formControl]="queryControl" />

    <ul>
      <li *ngFor="let user of filteredUsers$ | async">
        {{ user.firstName + ' ' + user.lastName }}
      </li>
    </ul>

    <div>
      <button
        *ngFor="let pageSize of pageSizes"
        [class.active]="pageSize === (selectedPageSize$ | async)"
        (click)="onUpdateSelectedPageSize(pageSize)"
      >
        {{ pageSize }}
      </button>
    </div>
  `,
  styles: ['.active { background-color: aqua; }'],
  providers: [UsersStore],
})
export class UsersComponent implements OnInit {
  private readonly usersService = inject(UsersService);

  readonly pageSizes = [1, 3, 5, 10];
  readonly queryControl = new FormControl('', { nonNullable: true });

  readonly allUsers$ = new BehaviorSubject<User[]>([]);
  readonly selectedPageSize$ = new BehaviorSubject(5);
  readonly query$ = this.queryControl.valueChanges.pipe(
    startWith(this.queryControl.value),
    map((query) => query.trim().toLowerCase())
  );
  readonly filteredUsers$ = combineLatest({
    allUsers: this.allUsers$,
    selectedPageSize: this.selectedPageSize$,
    query: this.query$,
  }).pipe(
    map(({ allUsers, selectedPageSize, query }) =>
      filterUsers(allUsers, query, selectedPageSize)
    )
  );

  ngOnInit(): void {
    this.usersService.getAll().subscribe(this.allUsers$);
  }

  onUpdateSelectedPageSize(pageSize: number): void {
    this.selectedPageSize$.next(pageSize);
  }
}

function filterUsers(
  allUsers: User[],
  query: string,
  pageSize: number
): User[] {
  return allUsers
    .filter(({ firstName }) => firstName.toLowerCase().includes(query))
    .slice(0, pageSize);
}
