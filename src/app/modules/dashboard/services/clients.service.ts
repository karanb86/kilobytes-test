import {Injectable} from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {Observable} from 'rxjs';

@Injectable()
export class ClientsService {

  clientsSubUrl = '/users';
  constructor(private apiService: ApiService) {
  }

  loadClients(pageNo = 1, size = 20): Observable<any> {
    return this.apiService.get(`${this.clientsSubUrl}?pageNo=${pageNo}&size=${size}`);
  }
}
