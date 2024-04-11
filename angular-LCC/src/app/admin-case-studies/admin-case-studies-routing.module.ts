import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCaseStudiesComponent } from './admin-case-studies.component';

const routes: Routes = [{ path: '', component: AdminCaseStudiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCaseStudiesRoutingModule { }
