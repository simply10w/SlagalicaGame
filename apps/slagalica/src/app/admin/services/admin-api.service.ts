import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  User,
  AsocijacijaGame,
  SpojnicaGame,
  GameOfTheDay
} from '@slagalica/data';

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

  getAsocijacijaGames() {
    return this.http.get<{ asocijacijaGames: AsocijacijaGame[] }>(
      `/api/asocijacija-game`
    );
  }

  getSpojnicaGames() {
    return this.http.get<{ spojnicaGames: SpojnicaGame[] }>(
      `/api/spojnica-game`
    );
  }

  createGameOfTheDay(game: GameOfTheDay) {
    return this.http.post<{ game: GameOfTheDay }>(`/api/game-of-the-day`, {
      game
    });
  }
}
