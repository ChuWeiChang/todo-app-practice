import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {LoginStateService} from '../login-state.service';
import { Router } from '@angular/router';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

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
  private http = inject(HttpClient)
  private dialog = inject(MatDialog);
  private router = inject(Router);
  loginStateService = inject(LoginStateService)

  loginForm = this.formBuilder.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  onSubmit() {
    const formData = this.loginForm.value;
    this.http.post('/api/login', formData, { observe: 'response' }).subscribe({
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
