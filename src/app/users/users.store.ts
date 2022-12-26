import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { exhaustMap, pipe, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { User } from './user.model';
import { UsersService } from './users.service';

interface State {
  users: User[];
  selectedUserId: number | null;
  selectedPageSize: number;
  query: string;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
}

const initialState: State = {
  users: [],
  selectedUserId: null,
  selectedPageSize: 5,
  query: '',
  isLoading: false,
  isCreating: false,
  isUpdating: false,
};

@Injectable()
export class UsersStore extends ComponentStore<State> {
  private readonly usersService = inject(UsersService);

  // local state selectors
  private readonly users$ = this.select((state) => state.users);
  private readonly selectedUserId$ = this.select(
    (state) => state.selectedUserId
  );
  private readonly selectedPageSize$ = this.select(
    (state) => state.selectedPageSize
  );
  private readonly query$ = this.select((state) => state.query);
  private readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly isCreating$ = this.select((state) => state.isCreating);
  private readonly isUpdating$ = this.select((state) => state.isUpdating);

  // derived selectors
  private readonly selectedUser$ = this.select(
    this.selectedUserId$,
    this.users$,
    (selectedUserId, users) =>
      selectedUserId ? users.find(({ id }) => id === selectedUserId) : null
  );
  private readonly loadUsersParams$ = this.select({
    query: this.query$,
    pageSize: this.selectedPageSize$,
  });

  // view model selector
  readonly vm$ = this.select({
    query: this.query$,
    selectedPageSize: this.selectedPageSize$,
    users: this.users$,
    selectedUserId: this.selectedUserId$,
    selectedUser: this.selectedUser$,
    isLoading: this.isLoading$,
    isCreating: this.isCreating$,
    isUpdating: this.isUpdating$,
  });

  // effects
  readonly loadUsers = this.effect<{ query: string; pageSize: number }>(
    pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(({ query, pageSize }) => {
        return this.usersService.getUsers(query, pageSize).pipe(
          tapResponse(
            (users) => this.patchState({ users, isLoading: false }),
            (error: HttpErrorResponse) => {
              console.error(error);
              this.patchState({ isLoading: false });
            }
          )
        );
      })
    )
  );

  readonly createUser = this.effect<Omit<User, 'id'>>(
    pipe(
      tap(() => this.patchState({ isCreating: true })),
      exhaustMap((user) =>
        this.usersService.createUser(user).pipe(
          tapResponse(
            () => {
              this.patchState({ isCreating: false });
              this.reloadUsers();
            },
            (error: HttpErrorResponse) => {
              console.error(error);
              this.patchState({ isCreating: false });
            }
          )
        )
      )
    )
  );

  readonly updateUser = this.effect<Omit<User, 'id'>>(
    pipe(
      tap(() => this.patchState({ isUpdating: true })),
      withLatestFrom(this.selectedUserId$),
      exhaustMap(([user, selectedUserId]) =>
        this.usersService.updateUser({ ...user, id: selectedUserId! }).pipe(
          tapResponse(
            () => {
              this.patchState({ isUpdating: false });
              this.reloadUsers();
            },
            (error: HttpErrorResponse) => {
              console.error(error);
              this.patchState({ isUpdating: false });
            }
          )
        )
      )
    )
  );

  constructor() {
    super(initialState);

    // re-fetch users every time when query or selectedPageSize changes
    this.loadUsers(this.loadUsersParams$);
  }

  reloadUsers(): void {
    this.loadUsers(this.loadUsersParams$.pipe(take(1)));
  }
}
