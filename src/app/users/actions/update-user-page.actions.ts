import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../user.model';

export const updateUserPageActions = createActionGroup({
  source: 'Update User Page',
  events: {
    Opened: emptyProps(),
    'User Form Submitted': props<{ user: User }>(),
  },
});
