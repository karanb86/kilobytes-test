import {NgModule} from '@angular/core';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { ClientsComponent } from './components/clients/clients.component';
import {ClientsService} from './services/clients.service';
import {ClientsResolver} from './resolvers/clients.resolver';
import {SharedModule} from '../shared/shared.module';
import {ClientsStoreService} from './mini-stores/clients-store.service';

const components = [
  DashboardContainerComponent,
  ClientsComponent
];

const modules = [
  DashboardRoutingModule,
  SharedModule
];

const services = [
  ClientsService,
  ClientsStoreService
];

const resolvers = [
  ClientsResolver
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...services, ...resolvers]
})

export class DashboardModule {}
