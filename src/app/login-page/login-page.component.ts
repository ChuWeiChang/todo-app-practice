import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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
  private http=inject(HttpClient)
  loginForm = this.formBuilder.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  onSubmit() {
    const formData = this.loginForm.value;
    this.http.post('/api/login', formData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        alert('Login successful!');
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed! Please check your username and password.');
      }
    });
  }
}
