import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

const USERS_API_URL = 'http://localhost:3000/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);

  getByFilter(filter: { query: string; pageSize: number }): Observable<User[]> {
    return this.http.get<User[]>(USERS_API_URL, {
      params: { q: filter.query, _limit: filter.pageSize },
    });
  }
}
