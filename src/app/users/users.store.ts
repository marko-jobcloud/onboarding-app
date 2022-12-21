import { inject, Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { User } from './user.model';
import { UsersService } from './users.service';

interface State {
  users: User[];
  selectedPageSize: number;
  query: string;
}

const initialState: State = {
  users: [],
  selectedPageSize: 5,
  query: '',
};

@Injectable()
export class UsersStore extends ComponentStore<State> {
  private readonly usersService = inject(UsersService);

  readonly allUsers$ = this.select((state) => state.users);
  readonly selectedPageSize$ = this.select((state) => state.selectedPageSize);
  readonly query$ = this.select((state) => state.query);

  readonly filteredUsers$ = this.select(
    this.allUsers$,
    this.selectedPageSize$,
    this.query$,
    (allUsers, selectedPageSize, query) =>
      filterUsers(allUsers, query, selectedPageSize)
  );

  readonly vm$ = this.select({
    query: this.query$,
    selectedPageSize: this.selectedPageSize$,
    filteredUsers: this.filteredUsers$,
  });

  readonly loadAllUsers = this.effect(($) => {
    return $.pipe(
      exhaustMap(() => this.usersService.getAll()),
      tap((users) => this.patchState({ users }))
    );
  });

  constructor() {
    super(initialState);
    this.loadAllUsers();
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
