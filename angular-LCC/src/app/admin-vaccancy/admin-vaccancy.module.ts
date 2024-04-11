import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConstantService } from '../services/constant.service';
import { AdminVaccancyRoutingModule } from './admin-vaccancy-routing.module';
import { AdminVaccancyComponent } from './admin-vaccancy.component';

@NgModule({
  declarations: [AdminVaccancyComponent],
  imports: [
    CommonModule,
    AdminVaccancyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConstantService
  ],
  exports : [
    AdminVaccancyComponent,
  ]
})
export class AdminVaccancyModule { }
