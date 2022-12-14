import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

const USERS_API_URL = 'http://localhost:3000/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);

  getUsers(query: string, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(USERS_API_URL, {
      params: { q: query, _limit: pageSize },
    });
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(USERS_API_URL, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${USERS_API_URL}/${user.id}`, user);
  }
}
