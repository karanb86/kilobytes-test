import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthContainerComponent} from './containers/auth-container/auth-container.component';
import {LoginComponent} from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {SharedModule} from '../shared/shared.module';
import {LogoutComponent} from './components/logout/logout.component';

const components = [
  AuthContainerComponent,
  LoginComponent,
  LogoutComponent
];

const modules = [
  AuthRoutingModule,
  SharedModule
];

const providers = [
  AuthService
];

@NgModule({
  declarations: [...components],
  providers: [...providers],
  imports: [...modules]
})

export class AuthModule {}
