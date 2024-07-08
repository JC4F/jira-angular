import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'project',
    // loadChildren: () =>
    //   import('./project/project.module').then(m => m.ProjectModule),
    loadComponent: () =>
      import('./features/project/project.component').then(
        m => m.ProjectComponent
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full',
  },
];
