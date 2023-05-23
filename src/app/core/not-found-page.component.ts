import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterModule],
  template: `
      <p>
          Ups! Go back to <a routerLink="/users"> users page!</a>
      </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NotFoundPageComponent {

}
