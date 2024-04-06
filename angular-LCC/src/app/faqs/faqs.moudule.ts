import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FaqsComponent } from './faqs.component';
import { FaqsRoutingModule } from './faqs-routing.module';

@NgModule({
  declarations: [FaqsComponent],
  imports: [
    CommonModule,
    FaqsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    FaqsComponent,
  ]
})
export class FaqsModule { }
