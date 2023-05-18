import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const usersPageActions = createActionGroup({
  source: 'Users Page',
  events: {
    opened: emptyProps(),
    queryChanged: props<{ query: string }>(),
    pageSizeChanged: props<{ selectedPageSize: number }>(),
  },
});
