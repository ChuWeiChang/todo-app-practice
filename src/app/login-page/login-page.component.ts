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
    this.http.post('/api/login', []).subscribe(config => {
      console.log('Updated config:', config);
    });
  }
}
