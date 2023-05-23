import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../user.model";

export const userEditPageActions = createActionGroup({
  source: 'Edit User Page',
  events: {
    opened: emptyProps(),
    formSubmitted: props<{ user: User }>()
  }
});
