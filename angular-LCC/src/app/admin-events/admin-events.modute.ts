import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConstantService } from '../services/constant.service';
import { AdminEventsComponent } from './admin-events.component';
import { AdminEventsRoutingModule } from './admin-events-routing.module';

@NgModule({
  declarations: [AdminEventsComponent],
  imports: [
    CommonModule,
    AdminEventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConstantService
  ],
  exports : [
    AdminEventsComponent,
  ]
})
export class AdminEventsModule { }
