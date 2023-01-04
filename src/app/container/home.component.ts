import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Welcome traveler</h1>
    <h3>You can manage users in this application</h3>
    <hr />
    <div>
      <button routerLink="/users">Users list</button>
      <button routerLink="/create-user">Add new user</button>
    </div>
  `,
  styles: [
    `
      h1,
      h3 {
        text-align: center;
      }

      div {
        display: flex;
        justify-content: space-between;
      }

      button {
        width: 20rem;
        height: 10rem;
        font-size: 2rem;
      }
    `,
  ],
})
export class HomeComponent {}
