import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoefficientsPage } from './coefficients.page';

const routes: Routes = [
  {
    path: '',
    component: CoefficientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoefficientsPageRoutingModule {}
