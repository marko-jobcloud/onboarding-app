import {createActionGroup, props} from '@ngrx/store';
import {User} from '../user.model';

export const usersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    usersLoadedSuccess: props<{ users: User[] }>(),
    usersLoadedFailure: props<{ errorMsg: string }>(),
    userCreatedSuccess: props<{ user: User }>(),
    userCreatedFailure: props<{ errorMsg: string }>(),
    userEditedSuccess: props<{ user: User }>(),
    userEditedFailure: props<{ errorMsg: string }>(),
    userLoadedSuccess: props<{ user: User }>(),
    userLoadedFailure: props<{ errorMsg: string }>(),
  },
});
