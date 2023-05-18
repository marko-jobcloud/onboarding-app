import { createActionGroup, props } from '@ngrx/store';
import { User } from '../user.model';

export const usersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    usersLoadedSuccess: props<{ users: User[] }>(),
    usersLoadedFailure: props<{ errorMsg: string }>(),
  },
});
