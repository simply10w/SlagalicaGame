import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'slagalica-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title$: Observable<string> = this.http
    .get<any>('/api')
    .pipe(map(response => response.message));

  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
