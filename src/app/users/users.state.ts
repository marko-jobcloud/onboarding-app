import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from './user.model';
import { usersApiActions } from './actions/users-api.actions';

type State = EntityState<User>;

const adapter = createEntityAdapter<User>();
const initialState: State = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(usersApiActions.usersLoadedSuccess, (state, { users }) =>
    adapter.setMany(users, state)
  )
);

export const usersFeature = createFeature({
  name: 'users',
  reducer,
  extraSelectors: ({ selectUsersState }) =>
    adapter.getSelectors(selectUsersState),
});
