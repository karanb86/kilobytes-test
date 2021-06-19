import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AUTH_TOKEN} from '../../../shared/constants';

@Component({
  template: `<h1>Logged out</h1>`
})

export class LogoutComponent {
  constructor(private router: Router) {
    localStorage.removeItem(AUTH_TOKEN);
    router.navigateByUrl('/');
  }
}
