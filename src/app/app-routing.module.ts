import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rpe',
    pathMatch: 'full'
  },
  {
    path: 'rpe',
    loadChildren: () => import('./rpe/rpe.module').then( m => m.RpePageModule)
  },
  {
    path: 'coeff',
    loadChildren: () => import('./coefficients/coefficients.module').then( m => m.CoefficientsPageModule)
  },
  {
    path: 'timer',
    loadChildren: () => import('./timer/timer.module').then( m => m.TimerPageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./loader/loader.module').then( m => m.LoaderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
