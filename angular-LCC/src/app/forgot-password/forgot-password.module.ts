import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConstantService } from '../services/constant.service';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConstantService
  ],
  exports : [
    ForgotPasswordComponent,
  ]
})
export class ForgotPasswordModule { }
