import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccanciesRoutingModule } from './vaccancies-routing.module';
import { VaccanciesComponent } from './vaccancies.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [VaccanciesComponent],
  imports: [
    CommonModule,
    VaccanciesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    VaccanciesComponent,
  ]
})
export class VaccanciesModule { }
