import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: '<footer>Made by JobCloud Devs</footer>',
  styles: [
    `
      footer {
        color: purple;
        text-align: center;
        border-top: 2px solid purple;
        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
