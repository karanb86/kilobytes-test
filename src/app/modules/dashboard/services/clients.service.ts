import {Injectable} from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {Observable} from 'rxjs';

@Injectable()
export class ClientsService {

  clientsSubUrl = '/users';
  documentsSubUrl = '/documents';
  constructor(private apiService: ApiService) {
  }

  loadClients(pageNo = 1, size = 20): Observable<any> {
    return this.apiService.get(`${this.clientsSubUrl}?pageNo=${pageNo}&size=${size}`);
  }

  loadClientDocuments(companyId: string, financialYear: string): Observable<any> {
    return this.apiService.get(`${this.documentsSubUrl}?clientId=${companyId}&financialYear=${financialYear}`);
  }

  mapFileToDocument(documentId: string, data: any): Observable<any> {
    return this.apiService.put(`${this.documentsSubUrl}/${documentId}`, data);
  }
 }
