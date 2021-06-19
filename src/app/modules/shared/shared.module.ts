import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})

export class SharedModule {}
