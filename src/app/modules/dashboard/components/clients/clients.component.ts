import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ClientsInfo, ClientsStoreService} from '../../mini-stores/clients-store.service';
import * as moment from 'moment';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  isAlive$ = new Subject();
  clients$ = new BehaviorSubject<Client[]>([]);
  loading = false;
  loaded = false;
  metaData: ClientsInfo = null;
  selectedPage = 1;
  constructor(private clientsStoreService: ClientsStoreService) {
  }

  ngOnInit(): void {
    this.clientsStoreService.fetchClients();
    this.clientsStoreService.getLoadingLoaded()
      .subscribe(({loading, loaded}) => {
        this.loading = loading;
        this.loaded = loaded;
    });
    this.clientsStoreService.getMetaData()
      .subscribe(res => this.metaData = res);
    this.clientsStoreService.getClients().subscribe(clients => {
      this.clients$.next(clients);
    });
  }

  getPages(p: number): any {
    return Array(p).fill('x');
  }

  getAssignedMembers(members: Client[]): string[]{
    return members.map(member => member?.name) || [];
  }

  getFormattedDate(date): any {
    return moment(date).format('MMM DD, YYYY');
  }

  onOpenClient(client: Client): void {
    console.error(client);
  }

  onPageChange(page: number): void {
    if (page <= this.metaData?.page_count && page > 0) {
      this.selectedPage = page;
      if (!(this.clients$.value.length > this.metaData.per_page * (page - 1))) {
        this.clientsStoreService.fetchMoreClients(page);
      }
    }
  }

  getSlicedClients(clients: Client[]): Client[] {
    return clients.slice((this.selectedPage - 1) * this.metaData?.per_page, this.selectedPage * this.metaData?.per_page);
  }

  ngOnDestroy(): void {
    this.isAlive$.next(false);
    this.isAlive$.complete();
  }
}

export interface Client {
  clientID: string;
  name: string;
  id: string;
  createdAt: string;
  assignedMembers: any[];
  fullData?: any;
}
