import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: '<h1>Welcome to Onboarding App!</h1>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
