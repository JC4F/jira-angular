import { Routes } from '@angular/router';
import { ProjectConst } from './constants';

export const routes: Routes = [
  {
    path: 'project',
    // loadChildren: () =>
    //   import('./project/project.module').then(m => m.ProjectModule),
    loadComponent: () =>
      import('./features/project/project.component').then(
        m => m.ProjectComponent
      ),
    children: [
      {
        path: 'board',
        loadComponent: () =>
          import('./features/project/features/board/board.component').then(
            m => m.BoardComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            './features/project/features/settings/settings.component'
          ).then(m => m.SettingsComponent),
      },
      {
        path: `issue/:${ProjectConst.IssueId}`,
        loadComponent: () =>
          import(
            './features/project/features/full-issue-detail/full-issue-detail.component'
          ).then(m => m.FullIssueDetailComponent),
      },
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
