import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from './user.model';
import { usersMock } from './users.mock';

@Injectable({ providedIn: 'root' })
export class UsersService {
  getAll(): Observable<User[]> {
    return of(usersMock).pipe(delay(2000));
  }
}
