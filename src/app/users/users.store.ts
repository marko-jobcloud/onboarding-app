import { inject, Injectable } from '@angular/core';
import { exhaustMap, pipe, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { User } from './user.model';
import { UsersService } from './users.service';

interface State {
  users: User[];
  selectedPageSize: number;
  query: string;
  isDisabledCreateButton: boolean,
  isDisabledUpdateButton: boolean,
  isLoading: boolean,
  selectedUserId: number | null
}

const initialState: State = {
  users: [],
  selectedPageSize: 5,
  query: '',
  isDisabledCreateButton: false,
  isDisabledUpdateButton: false,
  isLoading: false,
  selectedUserId: null
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
  private readonly isDisabledCreateButton$ = this.select(
    (state) => state.isDisabledCreateButton
  );
  private readonly isDisabledUpdateButton$ = this.select((
    state) => state.isDisabledUpdateButton
  );
  private readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly selectedUserId$ = this.select((state) => state.selectedUserId);

  // derived selectors
  private readonly loadUsersParams$ = this.select({
    query: this.query$,
    pageSize: this.selectedPageSize$,
  });

  private readonly selectedUser$ = this.select(this.selectedUserId$, this.users$, (selectedUserId, users) => {
    return selectedUserId ? users.filter((user) => user.id === selectedUserId)[0] : null
  })

  // view model selector
  readonly vm$ = this.select({
    query: this.query$,
    selectedPageSize: this.selectedPageSize$,
    users: this.users$,
    isDisabledCreateButton: this.isDisabledCreateButton$,
    isDisabledUpdateButton: this.isDisabledUpdateButton$,
    isLoading: this.isLoading$,
    selectedUserId: this.selectedUserId$,
    selectedUser: this.selectedUser$
  });

  // effects
  readonly loadUsers = this.effect<{ query: string; pageSize: number }>(
    pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(({ query, pageSize }) =>
        this.usersService.getUsers(query, pageSize)
      ),
      tap((users) => this.patchState({ users, isLoading: false })),
    )
  );

  readonly createUser = this.effect<Omit<User, 'id'>>(
    pipe(
      tap(() => this.patchState({ isDisabledCreateButton: true })),
      exhaustMap((user) => this.usersService.createUser(user)),
      tap(() => {
        this.patchState({ isDisabledCreateButton: false });
        this.loadUsers(this.loadUsersParams$.pipe(take(1)));
      }),
    )
  )

  readonly updateUser = this.effect<Omit<User, 'id'>>(
    pipe(
      tap(() => this.patchState({ isDisabledUpdateButton: true })),
      withLatestFrom(this.selectedUserId$),
      exhaustMap(([user, selectedUserId]) => this.usersService.updateUser({id: selectedUserId!, ...user})),
      tap(() => {
        this.patchState({ isDisabledUpdateButton: false });
        this.loadUsers(this.loadUsersParams$.pipe(take(1)));
      })
    )
  )


  constructor() {
    super(initialState);

    // re-fetch users every time when query or selectedPageSize changes
    this.loadUsers(this.loadUsersParams$);
  }
}
