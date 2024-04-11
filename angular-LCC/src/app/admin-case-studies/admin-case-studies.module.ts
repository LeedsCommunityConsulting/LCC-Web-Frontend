import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConstantService } from '../services/constant.service';
import { AdminCaseStudiesRoutingModule } from './admin-case-studies-routing.module';
import { AdminCaseStudiesComponent } from './admin-case-studies.component';

@NgModule({
  declarations: [AdminCaseStudiesComponent],
  imports: [
    CommonModule,
    AdminCaseStudiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConstantService
  ],
  exports : [
    AdminCaseStudiesComponent,
  ]
})
export class AdminCaseStudiesModule { }
