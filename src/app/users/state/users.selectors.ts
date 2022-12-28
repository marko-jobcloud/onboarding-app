import { createSelector } from '@ngrx/store';
import { usersFeature } from './users.reducer';

export const {
  selectUsers,
  selectSelectedUserId,
  selectQuery,
  selectIsCreating,
  selectIsUpdating,
  selectIsLoading,
  selectSelectedPageSize,
} = usersFeature;

export const selectSelectedUser = createSelector(
  selectSelectedUserId,
  selectUsers,
  (selectedUserId, users) =>
    selectedUserId ? users.find(({ id }) => id === selectedUserId) : null
);
