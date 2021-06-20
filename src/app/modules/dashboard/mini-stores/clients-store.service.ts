import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ClientsService} from '../services/clients.service';
import {Client} from '../components/clients/clients.component';
import {map, take} from 'rxjs/operators';

@Injectable()

export class ClientsStoreService {

  clientsInfo = new BehaviorSubject<ClientsInfo>(null);
  clients = new BehaviorSubject<Client[]>([]);

  loaded = false;
  loading = false;

  constructor(private clientsService: ClientsService) {
  }

  fetchClients(): Observable<boolean> {
    this.loading = true;
    if (this.clients.value.length === 0 && !this.loaded) {
      this.clientsService.loadClients()
        .pipe(take(1), map(res => {
          const {records: clients, _metaData} = res;
          return [clients.map(client => {
            return {
              clientID: client?.clientID,
              name: client?.name,
              companyId: client?._id,
              createdAt: client?.createdAt,
              assignedMembers: client?.assignedMembers,
              fullData: client
            };
          }), _metaData];
        }))
        .subscribe(([clients, metaData]: [Client[], ClientsInfo]) => {
          this.clients.next(clients);
          this.clientsInfo.next(metaData);
          this.loaded = true;
          this.loading = false;
        });
    }
    return of(this.loaded);
  }

  fetchMoreClients(pageNo: number, size = 20): void {
    this.loading = true;
    const filterAndConcat = (newArray: Client[], oldArray: Client[]): Client[] => {
      const resultingArray = [...oldArray];
      newArray.forEach(newEl => {
        const index = oldArray.findIndex(oldEl => oldEl.clientID === newEl.clientID);
        if (index === -1)  { resultingArray.push(newEl); }
      });
      return resultingArray;
    };

    this.clientsService.loadClients(pageNo, size)
      .pipe(take(1), map(res => {
        const {records: clients, _metaData} = res;
        return [clients.map(client => {
          return {
            clientID: client?.clientID,
            name: client?.name,
            companyId: client?._id,
            createdAt: client?.createdAt,
            assignedMembers: client?.assignedMembers,
            fullData: client
          };
        }), _metaData];
      }))
      .subscribe(([newClients, metaData]: [Client[], ClientsInfo]) => {
        const oldClients = this.clients.value;
        this.clients.next(filterAndConcat(newClients, oldClients));
        this.clientsInfo.next(metaData);
        this.loading = false;
      });
  }

  getLoadingLoaded(): Observable<{loading: boolean, loaded: boolean}> {
    return of({loading: this.loading, loaded: this.loaded});
  }

  getMetaData(): Observable<ClientsInfo> {
    return this.clientsInfo;
  }
  getClients(): Observable<Client[]> {
    return this.clients;
  }

}

export interface ClientsInfo {
  page: number;
  page_count: number;
  per_page: number;
  total_count: number;
}
