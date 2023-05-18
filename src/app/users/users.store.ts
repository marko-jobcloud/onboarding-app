import { inject, Injectable } from '@angular/core';
import { exhaustMap, switchMap, tap } from 'rxjs';
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

  private readonly filter$ = this.select({
    query: this.query$,
    pageSize: this.selectedPageSize$,
  });

  readonly vm$ = this.select({
    users: this.users$,
    query: this.query$,
    selectedPageSize: this.selectedPageSize$,
    isLoading: this.isLoading$,
  }, { debounce: true });

  constructor() {
    super(initialState);

    this.loadUsersByFilter(this.filter$);
  }

  readonly loadUsersByFilter = this.effect<{ query: string; pageSize: number }>(
    (filter$) => {
      return filter$.pipe(
        tap(() => this.patchState({ isLoading: true })),
        switchMap((filter) =>
          this.usersService.getByFilter(filter).pipe(
            tapResponse({
              next: (users) => this.patchState({ users }),
              error: console.error,
              finalize: () => this.patchState({ isLoading: false }),
            })
          )
        )
      );
    }
  );
}
