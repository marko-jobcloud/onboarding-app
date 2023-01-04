import { createActionGroup, props } from '@ngrx/store';
import { User } from '../user.model';

export const createUserActions = createActionGroup({
  source: 'Create User Page',
  events: {
    'Save User': props<{ user: Omit<User, 'id'> }>(),
    'User Saved Success': props<{ successMsg: string }>(),
    'User Saved Fail': props<{ errorMsg: string }>(),
  },
});
