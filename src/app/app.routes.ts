import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddListComponent} from './add-list/add-list.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-list', component: AddListComponent },
];
