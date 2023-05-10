import { inject, Injectable } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { BaseStore, select } from '../shared/base-store';
import { User } from './user.model';
import { UsersService } from './users.service';

type UsersState = {
  users: User[];
  query: string;
  selectedPageSize: number;
};

const initialState: UsersState = {
  users: [],
  query: '',
  selectedPageSize: 5,
};

@Injectable()
export class UsersStore extends BaseStore<UsersState> {
  private readonly usersService = inject(UsersService);

  readonly users$ = this.state$.pipe(select((s) => s.users));
  readonly query$ = this.state$.pipe(select((s) => s.query));
  readonly selectedPageSize$ = this.state$.pipe(
    select((s) => s.selectedPageSize)
  );

  readonly filteredUsers$ = combineLatest({
    users: this.users$,
    query: this.query$,
    selectedPageSize: this.selectedPageSize$,
  }).pipe(
    map(({ users, query, selectedPageSize }) =>
      users
        .filter(({ firstName }) => firstName.toLowerCase().includes(query))
        .slice(0, selectedPageSize)
    )
  );

  constructor() {
    super(initialState);

    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.usersService.getAll().subscribe((users) => this.patchState({ users }));
  }
}
