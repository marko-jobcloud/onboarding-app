import { createActionGroup, props } from "@ngrx/store";
import { User } from "../user.model";

export const UserUpdateActions = createActionGroup({
    source: 'User Update Page',
    events: {
        'Update user': props<{ user: Omit<User, 'id'> }>(),
    }
})