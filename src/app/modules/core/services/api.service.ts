import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {
  }

  get<T>(path: string, data?: any): Observable<T> {
    return this.http.get<T>(`${environment.base_url}${path}`, {params: data})
      .pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: {[key: string]: any}): Observable<T> {
    return this.http.post<T>(`${environment.base_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: { [key: string]: any } = {}): Observable<T> {
    return this.http.put<T>(`${environment.base_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors = (error: any) => {
    if (error.status === 401) {
      console.error(error);
    }
    return throwError(error.error);
  }
}
