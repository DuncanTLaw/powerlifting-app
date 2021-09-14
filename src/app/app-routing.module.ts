import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HelpGuard } from './help/help.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/help',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule),
    canLoad: [HelpGuard]
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
