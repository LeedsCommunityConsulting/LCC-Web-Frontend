import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConstantService } from '../services/constant.service';
import { AdminEventsComponent } from './admin-events.component';
import { AdminEventsRoutingModule } from './admin-events-routing.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

@NgModule({
  declarations: [AdminEventsComponent],
  imports: [
    CommonModule,
    AdminEventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConstantService,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AngularDateTimePickerModule
    
  ],
  exports : [
    AdminEventsComponent,
  ]
})
export class AdminEventsModule { }
