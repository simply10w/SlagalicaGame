import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpojnicaGame } from '@slagalica/data';

@Injectable({
  providedIn: 'root'
})
export class SpojnicaGameApiService {
  constructor(private http: HttpClient) {}

  addGame(game: SpojnicaGame) {
    return this.http.post<{ game: SpojnicaGame }>(`api/spojnica-game`, {
      game
    });
  }
}
