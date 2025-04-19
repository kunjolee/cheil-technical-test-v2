import { Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks-page/task-page.component';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: TasksPageComponent,
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./components/task-list/task-list.component').then(
            (m) => m.TaskListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./components/task-form/task-form.component').then(
            (m) => m.TaskFormComponent
          ),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./components/task-detail/task-detail.component').then(
            (m) => m.TaskDetailComponent
          ),
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];
