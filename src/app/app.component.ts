import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoginStateService} from './login-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    `
      <div class="root-container">
        <div>
          <button routerLink="/login" [disabled]="isLoggedIn()">Go to Login</button>
          <button routerLink="/dashboard" [disabled]="!isLoggedIn()">Go to Dashboard</button>
          <button routerLink="/add-list" [disabled]="!isLoggedIn()">Go to Add-List</button>
        </div>
        <br><br>
        <router-outlet></router-outlet>
      </div>
    `,
  styles: `
    .root-container {
      position: absolute;
      top:10%;
      left:30%;
      width:70vw;
    }
  `
})
export class AppComponent {
  loginStateService = inject(LoginStateService)
  isLoggedIn = this.loginStateService.LoggedIn;
}
