import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UsersStore } from './users.store';
import { PaginatorComponent } from '../shared/paginator.component';
import { SearchBoxComponent } from '../shared/search-box.component';
import { UserListComponent } from './components/user-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginatorComponent, SearchBoxComponent, UserListComponent],
  template: `
    <h1>Users</h1>

    <app-search-box (searchEvent)="onSearchChange($event)"></app-search-box>

    <app-user-list [users]="filteredUsers$ | async"></app-user-list>

    <app-paginator
      [selectedPageSize]="userStore.selectedPageSize$ | async"
      (pageSizeChange)="onUpdateSelectedPageSize($event)">
    </app-paginator>
  `,
  providers: [UsersStore],
})
export class UsersComponent {
  readonly userStore = inject(UsersStore)

  readonly filteredUsers$ = combineLatest({
    allUsers: this.userStore.allUsers$,
    selectedPageSize: this.userStore.selectedPageSize$,
    query: this.userStore.query$,
  }).pipe(
    map(({ allUsers, selectedPageSize, query }) =>
      filterUsers(allUsers, query, selectedPageSize)
    )
  );


  onUpdateSelectedPageSize(pageSize: number): void {
    this.userStore.patchState({ selectedPageSize: pageSize })
  }

  onSearchChange(query: string): void {
    this.userStore.patchState({ query })
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
