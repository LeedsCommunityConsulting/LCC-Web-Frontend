import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConstantService } from '../services/constant.service';
import { AdminEventsComponent } from './admin-events.component';
import { AdminEventsRoutingModule } from './admin-events-routing.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

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
    AngularDateTimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    
  ],
  exports : [
    AdminEventsComponent,
  ]
})
export class AdminEventsModule { }
