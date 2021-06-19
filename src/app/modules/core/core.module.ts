import {NgModule} from '@angular/core';
import {ApiService} from './services/api.service';
import {AuthGuard} from '../../guards/auth.guard';
import {AnonymousGuard} from '../../guards/anonymous.guard';

const services = [
  AnonymousGuard,
  ApiService
];

const guards = [AuthGuard];

@NgModule({
  providers: [...services, ...guards]
})

export class CoreModule {
}
