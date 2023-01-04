import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../user.model';

export const updateUserAction = createActionGroup({
  source: 'Update-User Page',
  events: {
    Opened: emptyProps(),
    'Select User': props<{ selectedUserId: number }>(),
    'Update User': props<{ user: Omit<User, 'id'> }>(),
    'User Update Success': props<{ successMsg: string }>(),
    'User Update Fail': props<{ errorMsg: string }>(),
  },
});
