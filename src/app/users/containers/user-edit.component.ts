import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { PushPipe } from '@ngrx/component';

@Component({
  standalone: true,
  template: ` <h1>Edit User {{ id$ | ngrxPush }}</h1> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PushPipe],
})
export default class UserEditComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly id$ = this.activatedRoute.params.pipe(
    map((params) => params['id']),
    distinctUntilChanged()
  );
}
