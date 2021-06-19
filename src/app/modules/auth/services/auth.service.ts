import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../core/services/api.service';
import {tap} from 'rxjs/operators';
import {AUTH_TOKEN} from '../../shared/constants';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {
  }

  authSubUrl = '/auth';

  login(data: any): Observable<any> {
    return this.apiService.post(`${this.authSubUrl}/login`, data)
      .pipe(tap(res => {
        if (!!res?.token) {
          localStorage.setItem(AUTH_TOKEN, res?.token);
        }
      }));
  }
}
