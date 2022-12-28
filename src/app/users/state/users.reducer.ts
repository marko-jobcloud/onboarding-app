import { User } from '../user.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { usersPageActions } from '../actions/users-page.actions';
import { usersApiActions } from '../actions/users-api.actions';

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
  }))
);

export const usersFeature = createFeature({ name: 'users', reducer });
