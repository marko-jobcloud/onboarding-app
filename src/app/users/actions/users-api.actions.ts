import { createActionGroup, props } from '@ngrx/store';
import { User } from '../user.model';

export const usersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    'Users Loaded Success': props<{ users: User[] }>(),
    'Users Loaded Failure': props<{ errorMsg: string }>(),
    'User Created Success': props<{ msg: string }>(),
    'User Created Failure': props<{ errorMsg: string }>(),
    'User Updated Success': props<{ msg: string }>(),
    'User Updated Failure': props<{ errorMsg: string }>(),
  },
});
