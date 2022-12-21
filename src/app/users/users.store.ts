import { inject, Injectable } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
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

  // local state selectors
  private readonly users$ = this.select((state) => state.users);
  private readonly selectedPageSize$ = this.select(
    (state) => state.selectedPageSize
  );
  private readonly query$ = this.select((state) => state.query);

  // derived selectors
  private readonly loadUsersParams$ = this.select({
    query: this.query$,
    pageSize: this.selectedPageSize$,
  });

  // view model selector
  readonly vm$ = this.select({
    query: this.query$,
    selectedPageSize: this.selectedPageSize$,
    users: this.users$,
  });

  // effects
  readonly loadUsers = this.effect<{ query: string; pageSize: number }>(
    pipe(
      switchMap(({ query, pageSize }) =>
        this.usersService.getUsers(query, pageSize)
      ),
      tap((users) => this.patchState({ users }))
    )
  );

  constructor() {
    super(initialState);

    // re-fetch users every time when query or selectedPageSize changes
    this.loadUsers(this.loadUsersParams$);
  }
}
