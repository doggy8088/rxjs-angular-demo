import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo1';
  data$: Observable<any> = of([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.data$ = this.http.get<any>('/assets/data.json')
      .pipe(
        shareReplay(1)
      );
  }
}
