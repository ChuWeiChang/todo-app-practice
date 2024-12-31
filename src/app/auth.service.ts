import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthModel} from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  login(formData: AuthModel) {
    return this.http.post('/api/login', formData, { observe: 'response' });
  }
}
