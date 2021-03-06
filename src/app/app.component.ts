import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject, timer, Subject, merge } from 'rxjs';
import { map, shareReplay, switchMap, take, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo1';

  destroy$ = new Subject();
  refresh$ = new BehaviorSubject(null);
  data$: Observable<any> = of([]);
  timeout$ = timer(10*60*1000).pipe(take(1));
  time$ = timer(0, 1000).pipe(
    map((v, idx) => new Date(10*60*1000 - v*1000).toJSON().substr(11, 8)),
    takeUntil(merge(this.destroy$, this.timeout$))
  );

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.data$ = this.refresh$.pipe(
      switchMap(() => this.http.get<any>('/assets/data.json')),
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refresh() {
    this.refresh$.next(null);
  }
}
