import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginStateService} from '../../../shared/services/auth/login-state.service';
import {Observable} from 'rxjs';
import {TodoListItem, TodoListItemList} from '../../../shared/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class AddTodoListService {

  private http = inject(HttpClient);
  private loginState = inject(LoginStateService);

  appendTodoItem(formData: TodoListItem): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.loginState.sessionKey());
    return this.http.post('/api/user/todos', formData, { headers });
  }
  updateTodoItems(formData: TodoListItemList): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.loginState.sessionKey());
    return this.http.put('/api/user/todos', formData, { headers });
  }
}
