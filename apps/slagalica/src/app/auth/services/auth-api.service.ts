import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto, User, RegisterDto, ResetPasswordDto } from '@slagalica/data';

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
    return this.http.post<{ user: User }>('/api/users/register', formData);
  }

  resetPassword(data: ResetPasswordDto) {
    return this.http.put<{ user: User }>('/api/users/reset-password', data);
  }

  logout() {
    // return of(true);
  }
}
