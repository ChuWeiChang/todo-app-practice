import { Routes } from '@angular/router';
import {routeGuard} from './routeGuard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',
    loadComponent: ()=> import('./login-page/login-page.component').then(m=>m.LoginPageComponent),
    canActivate: [routeGuard]
  },
  { path: 'dashboard',
    loadComponent:()=> import('./dashboard/dashboard.component').then(m=>m.DashboardComponent),
    canActivate: [routeGuard]
  },
  { path: 'add-list',
    loadComponent:()=> import('./add-list/add-list.component').then(m=>m.AddListComponent),
    canActivate: [routeGuard]
  },
];

