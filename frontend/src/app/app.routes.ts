import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./modules/tasks/tasks.routes').then((m) => m.TASK_ROUTES),
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];
