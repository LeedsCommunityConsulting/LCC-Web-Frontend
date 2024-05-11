import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClientInfoRoutingModule } from './client-info-routing.module';
import { ClientInfoComponent } from './client-info.component';

@NgModule({
  declarations: [ClientInfoComponent],
  imports: [
    CommonModule,
    ClientInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    ClientInfoComponent,
  ]
})
export class ClientInfoModule { }
