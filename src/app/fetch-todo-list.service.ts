import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginStateService} from './login-state.service';
import {Observable} from 'rxjs';
import {TodoListItem} from './dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class FetchTodoListService {
  private http = inject(HttpClient);
  private loginState = inject(LoginStateService);

  updateList(): Observable<TodoListItem[]> {
    const headers = new HttpHeaders().set('Authorization', this.loginState.sessionKey());
    return this.http.get<TodoListItem[]>('/api/list', { headers });
  }
}
