import { User } from '../user.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { usersPageActions } from '../actions/users-page.actions';
import { usersApiActions } from '../actions/users-api.actions';
import { UserCreateActions } from '../actions/user-create.actions';
import { UserUpdateActions } from '../actions/user-update.actions';

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

const reducer = createReducer(
  initialState,
  on(usersPageActions.opened, (state) => ({ ...state, isLoading: true })),
  on(usersPageActions.queryChanged, (state, { query }) => ({
    ...state,
    query,
    isLoading: true,
  })),
  on(usersPageActions.pageSizeChanged, (state, { selectedPageSize }) => ({
    ...state,
    selectedPageSize,
    isLoading: true,
  })),
  on(usersPageActions.selectedUserChanged, (state, { selectedUserId }) => ({
    ...state,
    selectedUserId,
  })),
  on(usersApiActions.usersLoadedSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
  })),
  on(usersApiActions.usersLoadedFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(UserCreateActions.createUser, (state) => ({
    ...state,
    isCreating: true
  })),
  on(UserUpdateActions.updateUser, (state) => ({
    ...state,
    isUpdating: true
  })),
  on(usersApiActions.userCreatedSuccess, (state) => ({
    ...state,
    isCreating: false,
  })),
  on(usersApiActions.userCreatedFailure, (state) => ({
    ...state,
    isCreating: false,
  })),
  on(usersApiActions.userUpdatedSuccess, (state) => ({
    ...state,
    isUpdating: false,
  })),
  on(usersApiActions.userUpdatedFailure, (state) => ({
    ...state,
    isUpdating: false,
  })),
);

export const usersFeature = createFeature({ name: 'users', reducer });
