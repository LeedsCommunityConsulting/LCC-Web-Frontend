import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccanciesComponent } from './vaccancies.component';

const routes: Routes = [{ path: '', component: VaccanciesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccanciesRoutingModule { }
