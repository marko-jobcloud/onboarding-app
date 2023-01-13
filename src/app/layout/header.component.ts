import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/home">Home</a>
      <a routerLink="/users">Users</a>
    </nav>
  `,
  styles: [
    `
      nav {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 2px solid purple;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
