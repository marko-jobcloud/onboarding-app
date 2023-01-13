import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const usersPageActions = createActionGroup({
  source: 'Users Page',
  events: {
    Opened: emptyProps(),
    'Query Changed': props<{ query: string }>(),
    'Page Size Changed': props<{ selectedPageSize: number }>(),
  },
});
