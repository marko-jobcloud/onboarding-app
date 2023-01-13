import { createActionGroup, props } from '@ngrx/store';
import { User } from '../user.model';

export const usersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    'Users Loaded Success': props<{ users: User[] }>(),
    'Users Loaded Failure': props<{ error: string }>(),
    'User Loaded Success': props<{ user: User }>(),
    'User Loaded Failure': props<{ error: string }>(),
    'User Created Success': props<{ user: User }>(),
    'User Created Failure': props<{ error: string }>(),
    'User Updated Success': props<{ user: User }>(),
    'User Updated Failure': props<{ error: string }>(),
  },
});
