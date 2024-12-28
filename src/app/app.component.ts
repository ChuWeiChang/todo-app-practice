import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template:
    `
    <div>
      <button routerLink="/login">Go to Login</button>
      <button routerLink="/dashboard">Go to Dashboard</button>
      <button routerLink="/todo-list">Go to Todo List</button>
    </div>
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
  title = 'todo-app';
}
