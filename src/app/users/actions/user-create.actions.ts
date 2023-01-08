import { createActionGroup, props } from "@ngrx/store";
import { User } from "../user.model";

export const UserCreateActions = createActionGroup({
    source: 'User Create Page',
    events: {
        'Create user': props<{ user: Omit<User, 'id'> }>(),
    }
})