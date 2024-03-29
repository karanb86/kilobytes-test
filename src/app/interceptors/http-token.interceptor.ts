import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AUTH_TOKEN} from '../modules/shared/constants';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json'
    };

    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      headersConfig['Authorization'] = token;
    }
    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request);
  }
}
