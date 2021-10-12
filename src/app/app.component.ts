import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject, timer } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo1';

  refresh$ = new BehaviorSubject(null);
  data$: Observable<any> = of([]);
  time$ = timer(500, 1000).pipe(
    map((v, idx) => new Date().toString())
  );

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.data$ = this.refresh$.pipe(
      switchMap(() => this.http.get<any>('/assets/data.json')),
      shareReplay(1)
    );
  }

  refresh() {
    this.refresh$.next(null);
  }
}
