import { Routes } from '@angular/router';
import {routeGuard} from './core/routeGuard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',
    loadComponent: ()=> import('./feature/auth/components/login-page/login-page.component').then(m=>m.LoginPageComponent),
    canActivate: [routeGuard]
  },
  { path: 'dashboard',
    loadComponent:()=> import('./feature/todo-lists/components/dashboard/dashboard.component').then(m=>m.DashboardComponent),
    canActivate: [routeGuard]
  },
  { path: 'add-list',
    loadComponent:()=> import('./feature/todo-lists/components/add-list/add-list.component').then(m=>m.AddListComponent),
    canActivate: [routeGuard]
  },
];

