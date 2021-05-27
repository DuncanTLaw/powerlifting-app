import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RpePage } from './rpe.page';

const routes: Routes = [
  {
    path: '',
    component: RpePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RpePageRoutingModule {}
