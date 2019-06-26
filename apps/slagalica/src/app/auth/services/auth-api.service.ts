import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto, User, RegisterDto } from '@slagalica/data';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login({ userName, password }: LoginDto) {
    return this.http.post<{ user: User }>('/api/users/login', {
      userName,
      password
    });
  }

  register({ profileImage, ...user }: RegisterDto) {
    const formData = new FormData();
    formData.set('user', JSON.stringify(user));
    formData.set('profileImage', profileImage);
    return this.http.post<any>('/api/users/register', formData);
  }

  logout() {
    // return of(true);
  }
}
