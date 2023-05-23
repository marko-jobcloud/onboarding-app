import {createActionGroup, props} from "@ngrx/store";
import {User} from "../user.model";

export const userCreatePageActions = createActionGroup({
  source: 'Create User Page',
  events: {
    formSubmitted: props<{user: Omit<User, 'id'>}>()
  }
});
