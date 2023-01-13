import { createActionGroup, props } from '@ngrx/store';
import { User } from '../user.model';

export const createUserPageActions = createActionGroup({
  source: 'Create User Page',
  events: {
    'User Form Submitted': props<{ user: Omit<User, 'id'> }>(),
  },
});
