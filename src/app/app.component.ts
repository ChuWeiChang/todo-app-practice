import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoginStateService} from './login-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    `
    <div>
      <button routerLink="/login" [disabled]="isLoggedIn()">Go to Login</button>
      <button routerLink="/dashboard" [disabled]="!isLoggedIn()">Go to Dashboard</button>
      <button routerLink="/todo-list" [disabled]="!isLoggedIn()">Go to Todo List</button>
    </div>
    <router-outlet></router-outlet>
    `,
})
export class AppComponent {
  loginStateService = inject(LoginStateService)
  isLoggedIn = this.loginStateService.LoggedIn;

}
