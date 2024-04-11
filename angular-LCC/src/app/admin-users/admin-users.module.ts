import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConstantService } from '../services/constant.service';
import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersComponent } from './admin-users.component';

@NgModule({
  declarations: [AdminUsersComponent],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConstantService
  ],
  exports : [
    AdminUsersComponent,
  ]
})
export class AdminUsersModule { }
