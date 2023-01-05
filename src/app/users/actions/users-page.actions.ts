import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../user.model';

export const usersPageActions = createActionGroup({
  source: 'Users Page',
  events: {
    Opened: emptyProps(),
    'Query Changed': props<{ query: string }>(),
    'Selected User Changed': props<{ selectedUserId: number }>(),
    'Page Size Changed': props<{ selectedPageSize: number }>(),
    'Create user': props<{ user: Omit<User, 'id'> }>(),
    'Update user': props<{ user: Omit<User, 'id'> }>(),
  },
});
