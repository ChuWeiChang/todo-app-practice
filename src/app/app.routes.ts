import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddListComponent} from './add-list/add-list.component';
import {authGuard} from './auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'add-list', component: AddListComponent, canActivate: [authGuard] },
];
