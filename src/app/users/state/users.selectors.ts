import { createSelector } from '@ngrx/store';
import { usersFeature } from './users.reducer';
import { getCallStateSelectors } from '../../shared/state/call-state';
import { selectRouteParam } from '../../shared/state/router.selectors';
import { User } from '../user.model';

export const {
  selectEntities,
  selectIds,
  selectAll,
  selectTotal,
  selectFilteredIds,
  selectQuery,
  selectSelectedPageSize,
  selectLoadCallState,
  selectCreateCallState,
  selectUpdateCallState,
} = usersFeature;

export const {
  selectIsPending: selectIsLoadPending,
  selectIsFulfilled: selectIsLoadFulfilled,
  selectError: selectLoadError,
} = getCallStateSelectors(selectLoadCallState);

export const {
  selectIsPending: selectIsCreatePending,
  selectIsFulfilled: selectIsCreateFulfilled,
  selectError: selectCreateError,
} = getCallStateSelectors(selectCreateCallState);

export const {
  selectIsPending: selectIsUpdatePending,
  selectIsFulfilled: selectIsUpdateFulfilled,
  selectError: selectUpdateError,
} = getCallStateSelectors(selectUpdateCallState);

export const selectFilter = createSelector(
  selectQuery,
  selectSelectedPageSize,
  (query, pageSize) => ({ query, pageSize })
);

export const selectFilteredEntities = createSelector(
  selectFilteredIds,
  selectEntities,
  (filteredIds, entities) => filteredIds.map((id) => entities[id]) as User[]
);

export const selectEntityFromRoute = createSelector(
  selectRouteParam('id'),
  selectEntities,
  (id, entities) => (id ? entities[id] : undefined)
);
