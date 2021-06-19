import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ClientsService} from '../services/clients.service';
import {delay, take} from 'rxjs/operators';

@Injectable()

export class ClientsResolver implements Resolve<any> {

  constructor(private clientsService: ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.clientsService.loadClients().pipe(take(1), delay(1000));
  }
}
