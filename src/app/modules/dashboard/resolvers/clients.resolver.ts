import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ClientsStoreService} from '../mini-stores/clients-store.service';
import {delay} from 'rxjs/operators';

@Injectable()

export class ClientsResolver implements Resolve<any> {

  constructor(private clientsStoreService: ClientsStoreService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.clientsStoreService.fetchClients().pipe(delay(1500));
  }
}
