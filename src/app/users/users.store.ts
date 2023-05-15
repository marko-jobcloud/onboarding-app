import { inject, Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { User } from './user.model';
import { UsersService } from './users.service';

type UsersState = {
  users: User[];
  query: string;
  selectedPageSize: number;
  isLoading: boolean;
};

const initialState: UsersState = {
  users: [],
  query: '',
  selectedPageSize: 5,
  isLoading: false,
};

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  private readonly usersService = inject(UsersService);

  private readonly users$ = this.select((s) => s.users);
  private readonly query$ = this.select((s) => s.query);
  private readonly selectedPageSize$ = this.select((s) => s.selectedPageSize);
  private readonly isLoading$ = this.select((s) => s.isLoading);

  private readonly filteredUsers$ = this.select(
    this.users$,
    this.query$,
    this.selectedPageSize$,
    (users, query, selectedPageSize) =>
      users
        .filter(({ firstName }) => firstName.toLowerCase().includes(query))
        .slice(0, selectedPageSize)
  );

  readonly vm$ = this.select({
    users: this.filteredUsers$,
    query: this.query$,
    selectedPageSize: this.selectedPageSize$,
    isLoading: this.isLoading$,
  });

  constructor() {
    super(initialState);

    this.loadAllUsers();
  }

  readonly loadAllUsers = this.effect<void>((trigger$) => {
    return trigger$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      exhaustMap(() =>
        this.usersService.getAll().pipe(
          tapResponse(
            (users) => this.patchState({ users, isLoading: false }),
            (error) => {
              console.error(error);
              this.patchState({ isLoading: false });
            }
          )
        )
      )
    );
  });
}
