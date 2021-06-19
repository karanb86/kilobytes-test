import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthContainerComponent} from './containers/auth-container/auth-container.component';
import {LoginComponent} from './components/login/login.component';
import {AnonymousGuard} from '../../guards/anonymous.guard';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthGuard} from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: AuthContainerComponent,
    children: [
      {
        path: 'login', canActivate: [AnonymousGuard],
        component: LoginComponent
      },
      {
        path: 'logout', canActivate: [AuthGuard],
        component: LogoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {}
