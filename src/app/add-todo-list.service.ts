import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginStateService} from './login-state.service';
import {Observable} from 'rxjs';

export interface TodoFormData {
  title: string;
  deadline: string; // Using string to match the format of the datetime-local input
  finished: boolean;
  priority: number;
}

@Injectable({
  providedIn: 'root'
})
export class AddTodoListService {

  private http = inject(HttpClient);
  private loginState = inject(LoginStateService);

  appendTodoItem(formData: TodoFormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.loginState.sessionKey());
    return this.http.post('/api/append-list', formData, { headers });
  }
}
