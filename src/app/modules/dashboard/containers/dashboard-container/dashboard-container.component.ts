import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {delay, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit, OnDestroy {

  isAlive$ = new Subject();
  fetchingData$ = new BehaviorSubject<boolean>(true);
  constructor(private router: Router) {
    router.events.pipe(delay(10), takeUntil(this.isAlive$)).subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationEnd) {
      this.fetchingData$.next(false);
    }
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.router.navigate(['/auth/logout']);
  }
  ngOnDestroy(): void {
    this.isAlive$.next(false);
    this.isAlive$.complete();
  }
}
