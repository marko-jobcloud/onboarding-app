import { User } from './user.model';
import { BaseStore, select } from '../shared/base-store';
import { UsersService } from './users.service';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map } from 'rxjs';

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
export class UsersStore extends BaseStore<State> {
  private readonly usersService = inject(UsersService);

  readonly allUsers$ = this.state$.pipe(select((state) => state.users));
  readonly selectedPageSize$ = this.state$.pipe(
    select((state) => state.selectedPageSize)
  );
  readonly query$ = this.state$.pipe(select((state) => state.query));

  readonly filteredUsers$ = combineLatest({
    allUsers: this.allUsers$,
    selectedPageSize: this.selectedPageSize$,
    query: this.query$,
  }).pipe(
    map(({ allUsers, selectedPageSize, query }) =>
      filterUsers(allUsers, query, selectedPageSize)
    )
  );

  constructor() {
    super(initialState);

    this.usersService.getAll().subscribe((users) => {
      this.patchState({ users });
    });
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
