import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsocijacijaGame } from '@slagalica/data';

@Injectable({
  providedIn: 'root'
})
export class AsocijacijaGameApiService {
  constructor(private http: HttpClient) {}

  addGame(game: AsocijacijaGame) {
    return this.http.post<{ game: AsocijacijaGame }>(`api/asocijacija-game`, {
      game
    });
  }
}
