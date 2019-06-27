import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Word } from '@slagalica/data';

@Injectable({
  providedIn: 'root'
})
export class WordsGameApiService {
  constructor(private http: HttpClient) {}

  getAllWords() {
    return this.http.get<{ words: Word[] }>('/api/words');
  }

  addWord(word: string) {
    return this.http.post<{ word: Word }>(`api/words`, {
      word
    });
  }
}
