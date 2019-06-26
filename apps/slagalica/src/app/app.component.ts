import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'slagalica-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private title: Title) {
    this.title.setTitle('Slagalica');
  }
}
