import { createActionGroup, props } from '@ngrx/store';
import { User } from '../user.model';

export const usersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    'Users Loaded Success': props<{ users: User[] }>(),
    'Users Loaded Failure': props<{ errorMsg: string }>(),
  },
});
