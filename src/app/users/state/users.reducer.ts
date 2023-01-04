import { User } from '../user.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { usersPageActions } from '../actions/users-page.actions';
import { usersApiActions } from '../actions/users-api.actions';
import { createUserActions } from '../actions/create-users-page.action';
import { updateUserAction } from '../actions/update-user-page.action';

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
  on(usersApiActions.usersLoadedSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
  })),
  on(usersApiActions.usersLoadedFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(createUserActions.saveUser, (state, { user }) => ({
    ...state,
    user,
    isCreating: true,
  })),
  on(createUserActions.userSavedSuccess, (state) => ({
    ...state,
    isCreating: false,
  })),
  on(createUserActions.userSavedFail, (state) => ({
    ...state,
    isCreating: false,
  })),
  on(updateUserAction.opened, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(updateUserAction.selectUser, (state, { selectedUserId }) => ({
    ...state,
    selectedUserId,
    isLoading: false,
  })),
  on(updateUserAction.updateUser, (state, { user }) => ({
    ...state,
    user,
    isUpdating: true,
  })),
  on(updateUserAction.userUpdateSuccess, (state) => ({
    ...state,
    isUpdating: false,
  })),
  on(updateUserAction.userUpdateFail, (state) => ({
    ...state,
    isUpdating: false,
  }))
);

export const usersFeature = createFeature({ name: 'users', reducer });
