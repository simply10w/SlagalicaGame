import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@slagalica/data';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  constructor(private http: HttpClient) {}

  getPendingUsers() {
    return this.http.get<{ users: User[] }>('/api/users/pending');
  }

  acceptPendingUser(id: string) {
    const params = new HttpParams().set('decision', 'true');
    return this.http.put<{ user: User }>(`api/users/${id}/accept`, null, {
      params
    });
  }

  rejectPendingUser(id: string) {
    const params = new HttpParams().set('decision', 'true');
    return this.http.put<{ user: User }>(`/api/users/${id}/accept`, null, {
      params
    });
  }
}
