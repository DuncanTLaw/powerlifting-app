import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'rpe',
        loadChildren: () => import('../rpe/rpe.module').then( m => m.RpePageModule)
      },
      {
        path: 'coeff',
        loadChildren: () => import('../coefficients/coefficients.module').then( m => m.CoefficientsPageModule)
      },
      {
        path: 'timer',
        loadChildren: () => import('../timer/timer.module').then( m => m.TimerPageModule)
      },
      {
        path: 'loader',
        loadChildren: () => import('../loader/loader.module').then( m => m.LoaderPageModule)
      },
      {
        path: '',
        redirectTo: '/app/tabs/rpe',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/app/tabs/rpe',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
