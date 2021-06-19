import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {delay} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kilobytes';
  fetchingData$ = new BehaviorSubject<boolean>(true);
  constructor(private router: Router) {
    router.events.pipe(delay(10)).subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationEnd) {
      this.fetchingData$.next(false);
    }
  }
}
