import { BaseStore } from '../shared/base-store';
import { User } from './user.model';

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

export class UsersStore extends BaseStore<UsersState> {
  constructor() {
    super(initialState);
  }
}
