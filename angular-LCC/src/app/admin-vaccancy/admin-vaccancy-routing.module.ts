import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminVaccancyComponent } from './admin-vaccancy.component';

const routes: Routes = [{ path: '', component: AdminVaccancyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminVaccancyRoutingModule { }
