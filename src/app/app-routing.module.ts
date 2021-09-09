import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TeamGuard } from './team/team.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rpe',
    pathMatch: 'full'
  },
  {
    path: 'rpe',
    loadChildren: () => import('./rpe/rpe.module').then( m => m.RpePageModule),
    canLoad: [TeamGuard]
  },
  {
    path: 'coeff',
    loadChildren: () => import('./coefficients/coefficients.module').then( m => m.CoefficientsPageModule),
    canLoad: [TeamGuard]
  },
  {
    path: 'timer',
    loadChildren: () => import('./timer/timer.module').then( m => m.TimerPageModule),
    canLoad: [TeamGuard]
  },
  {
    path: 'loader',
    loadChildren: () => import('./loader/loader.module').then( m => m.LoaderPageModule),
    canLoad: [TeamGuard]
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then( m => m.TeamPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
