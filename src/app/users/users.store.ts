import { User } from './user.model';
import { BaseStore, select } from '../shared/base-store';
import { UsersService } from './users.service';
import { inject, Injectable } from '@angular/core';

interface State {
  allUsers: User[];
  selectedPageSize: number;
  query: string;
}

const initialState: State = {
  allUsers: [],
  selectedPageSize: 5,
  query: '',
};

@Injectable()
export class UsersStore extends BaseStore<State> {
  private readonly usersService = inject(UsersService);

  readonly allUsers$ = this.state$.pipe(select((state) => state.allUsers));
  readonly selectedPageSize$ = this.state$.pipe(
    select((state) => state.selectedPageSize)
  );

  constructor() {
    super(initialState);
  }
}
