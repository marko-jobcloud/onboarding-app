import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CallState } from '../../shared/state/call-state';
import { User } from '../user.model';
import { usersPageActions } from '../actions/users-page.actions';
import { usersApiActions } from '../actions/users-api.actions';
import { updateUserPageActions } from '../actions/update-user-page.actions';
import { createUserPageActions } from '../actions/create-user-page.actions';

interface State extends EntityState<User> {
  filteredIds: number[];
  selectedPageSize: number;
  query: string;
  loadCallState: CallState;
  createCallState: CallState;
  updateCallState: CallState;
}

const adapter = createEntityAdapter<User>();

const initialState: State = adapter.getInitialState({
  filteredIds: [],
  selectedPageSize: 5,
  query: '',
  loadCallState: 'init',
  createCallState: 'init',
  updateCallState: 'init',
});

const reducer = createReducer(
  initialState,
  on(usersPageActions.opened, (state) => ({
    ...state,
    loadCallState: 'pending',
  })),
  on(usersPageActions.queryChanged, (state, { query }) => ({
    ...state,
    query,
    loadCallState: 'pending',
  })),
  on(usersPageActions.pageSizeChanged, (state, { selectedPageSize }) => ({
    ...state,
    selectedPageSize,
    loadCallState: 'pending',
  })),
  on(createUserPageActions.userFormSubmitted, (state) => ({
    ...state,
    createCallState: 'pending',
  })),
  on(updateUserPageActions.userFormSubmitted, (state) => ({
    ...state,
    updateCallState: 'pending',
  })),
  on(usersApiActions.usersLoadedSuccess, (state, { users }) =>
    adapter.setMany(users, {
      ...state,
      filteredIds: users.map(({ id }) => id),
      loadCallState: 'fulfilled',
    })
  ),
  on(usersApiActions.usersLoadedFailure, (state, { error }) => ({
    ...state,
    filteredIds: [],
    loadCallState: { error },
  })),
  on(usersApiActions.userLoadedSuccess, (state, { user }) =>
    adapter.setOne(user, state)
  ),
  on(usersApiActions.userCreatedSuccess, (state, { user }) =>
    adapter.addOne(user, {
      ...state,
      createCallState: 'fulfilled',
    })
  ),
  on(usersApiActions.userCreatedFailure, (state, { error }) => ({
    ...state,
    createCallState: { error },
  })),
  on(usersApiActions.userUpdatedSuccess, (state, { user }) =>
    adapter.setOne(user, {
      ...state,
      updateCallState: 'fulfilled',
    })
  ),
  on(usersApiActions.userUpdatedFailure, (state, { error }) => ({
    ...state,
    updateCallState: { error },
  }))
);

const feature = createFeature({ name: 'users', reducer });
const entitySelectors = adapter.getSelectors(feature.selectUsersState);

export const usersFeature = { ...feature, ...entitySelectors };
