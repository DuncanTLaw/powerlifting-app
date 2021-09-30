import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetsPage } from './meets.page';

const routes: Routes = [
  {
    path: '',
    component: MeetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetsPageRoutingModule {}
