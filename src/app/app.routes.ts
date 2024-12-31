import { Routes } from '@angular/router';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',
    loadComponent: ()=> import('./login-page/login-page.component').then(m=>m.LoginPageComponent),
    canActivate: [authGuard]
  },
  { path: 'dashboard',
    loadComponent:()=> import('./dashboard/dashboard.component').then(m=>m.DashboardComponent),
    canActivate: [authGuard]
  },
  { path: 'add-list',
    loadComponent:()=> import('./add-list/add-list.component').then(m=>m.AddListComponent),
    canActivate: [authGuard]
  },
];

