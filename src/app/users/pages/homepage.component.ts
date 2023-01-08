import { Component } from "@angular/core";
import { UsersPageComponent } from "./users-page.component";
import { UserCreateComponent } from "./user-create.component";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [UsersPageComponent, UserCreateComponent, RouterModule],
    template: `
        <h2>Homepage</h2>
        <a routerLink="/users">List of users</a><br><br>
        <a routerLink="/create">Create New User</a><br><br><br><br><br><br>
    `
})
export class HomepageComponent {
    
}