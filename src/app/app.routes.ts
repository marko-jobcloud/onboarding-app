import { Route } from "@angular/router";
import { HomepageComponent } from "./users/pages/homepage.component";
import { UserCreateComponent } from "./users/pages/user-create.component";
import { UserUpdateComponent } from "./users/pages/user-update.component";
import { UsersPageComponent } from "./users/pages/users-page.component";

export const appRoutes: Route[] = [
    { path: '', component: HomepageComponent },
    { path: 'users', component: UsersPageComponent },
    { path: 'create', component: UserCreateComponent },
    { path: 'update/:id', component: UserUpdateComponent }, 
];