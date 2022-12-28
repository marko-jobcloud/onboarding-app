import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const usersPageActions = createActionGroup({
  source: 'Users Page',
  events: {
    Opened: emptyProps(),
    'Query Changed': props<{ query: string }>(),
    'Selected User Changed': props<{ selectedUserId: number }>(),
    'Page Size Changed': props<{ selectedPageSize: number }>(),
  },
});
