import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {LoginStateService} from '../../../../shared/services/auth/login-state.service';
import { Router } from '@angular/router';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {AuthModel} from '../../../../shared/model/auth.model';
import {AuthService} from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label for="user">user: </label>
      <input id="user" type="text" formControlName="user">
      <label for="password">password: </label>
      <input id="password" type="password" formControlName="password">
      <button type="submit" [disabled]="!loginForm.valid">Submit</button>
    </form>
  `
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  private auth = inject(AuthService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  loginStateService = inject(LoginStateService)

  loginForm = this.formBuilder.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  onSubmit() {
    const formData: AuthModel = (this.loginForm.value) as AuthModel;
    this.auth.login(formData).subscribe({
      next: (res) => {
            if (res.status === 200) {
              this.openDialog(true);
              this.loginStateService.LoggedIn.set(true);
              const sessionKey = res.headers.get('Authorization');
              if (sessionKey) {
                this.loginStateService.sessionKey.set(sessionKey);
              }
              this.router.navigate(['/dashboard']).then();
            }
          },
          error: (err) => {
            console.error('Error during login:', err);
            this.openDialog(false);
            this.loginForm.reset();
          },
    });
  }

  openDialog(loginSuccess:boolean): void {
    const title = loginSuccess ? 'Login Successful' : 'Login Failed';
    const message = loginSuccess? 'Login Successful!' : 'Invalid username or password. Please try again.';
    this.dialog.open(LoginDialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }
}
