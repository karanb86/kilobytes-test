import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardContainerComponent} from './containers/dashboard-container/dashboard-container.component';
import {ClientsComponent} from './components/clients/clients.component';
import {ClientsResolver} from './resolvers/clients.resolver';
import {ClientDetailsComponent} from './components/client-details/client-details.component';

const routes: Routes = [
  {
    path: '', component: DashboardContainerComponent,
    children: [
      {
        path: 'clients', component: ClientsComponent, resolve: [ClientsResolver]
      },
      {
        path: 'clients/:companyId', component: ClientDetailsComponent
      },
      {
        path: '', pathMatch: 'full', redirectTo: 'clients'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {}
