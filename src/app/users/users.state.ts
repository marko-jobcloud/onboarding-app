import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from './user.model';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { usersApiActions } from './actions/users-api.actions';
import { usersPageActions } from './actions/users-page.actions';
import { userCreatePageActions } from './actions/user-create-page.actions';
import { userEditPageActions } from './actions/user-edit-page.actions';
import { selectRouteParam } from '../shared/router.selectors';

interface State extends EntityState<User> {
  users: User[];
  filteredIds: number[];
  query: string;
  selectedPageSize: number;
  isLoading: boolean;
  isPending: boolean;
  error: string;
}

const adapter = createEntityAdapter<User>();

const initialState: State = adapter.getInitialState({
  users: [],
  filteredIds: [],
  query: '',
  selectedPageSize: 5,
  isLoading: false,
  isPending: false,
  error: '',
});

const reducer = createReducer(
  initialState,
  on(usersPageActions.opened, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(usersPageActions.queryChanged, (state, { query }) => ({
    ...state,
    query,
  })),
  on(usersPageActions.pageSizeChanged, (state, { selectedPageSize }) => ({
    ...state,
    selectedPageSize,
  })),
  on(userCreatePageActions.formSubmitted, (state) => ({
    ...state,
    isPending: true,
  })),
  on(userEditPageActions.formSubmitted, (state) => ({
    ...state,
    isPending: true,
  })),
  on(usersApiActions.usersLoadedSuccess, (state, { users }) =>
    adapter.setMany(users, {
      ...state,
      filteredIds: users.map(({ id }) => id),
      isLoading: false,
    })
  ),
  on(usersApiActions.usersLoadedFailure, (state) => ({
    ...state,
    filteredIds: [],
  })),
  on(usersApiActions.userLoadedSuccess, (state, { user }) =>
    adapter.setOne(user, state)
  ),
  on(usersApiActions.userCreatedSuccess, (state, { user }) =>
    adapter.addOne(user, {
      ...state,
      isPending: false,
    })
  ),
  on(usersApiActions.userCreatedFailure, (state, { errorMsg }) => ({
    ...state,
    isPending: false,
    error: errorMsg,
  })),
  on(usersApiActions.userEditedSuccess, (state, { user }) =>
    adapter.setOne(user, {
      ...state,
      isPending: false,
    })
  ),
  on(usersApiActions.userEditedFailure, (state, { errorMsg }) => ({
    ...state,
    isPending: false,
    error: errorMsg,
  }))
);

export const usersFeature = createFeature({
  name: 'users',
  reducer,
  extraSelectors: ({
    selectUsersState,
    selectQuery,
    selectSelectedPageSize,
    selectFilteredIds,
    selectEntities
  }) => ({
    ...adapter.getSelectors(selectUsersState),
    selectFilter: createSelector(
      selectQuery,
      selectSelectedPageSize,
      (query, pageSize) => ({ query, pageSize })
    ),
    selectFilteredEntities: createSelector(
      selectFilteredIds,
      selectEntities,
      (filteredIds, entities) => filteredIds.map((id) => entities[id]) as User[]
    ),
    selectEntityFromRoute: createSelector(
      selectRouteParam('id'),
      selectEntities,
      (id, entities) => (id ? entities[id] : undefined)
    ),
  }),
});
