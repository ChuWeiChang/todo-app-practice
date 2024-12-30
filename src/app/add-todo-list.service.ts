import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginStateService} from './login-state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTodoListService {

  private http = inject(HttpClient);
  private loginState = inject(LoginStateService);

  appendTodoItem(formData: TodoListItem): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.loginState.sessionKey());
    return this.http.post('/api/append-list', formData, { headers });
  }
}
