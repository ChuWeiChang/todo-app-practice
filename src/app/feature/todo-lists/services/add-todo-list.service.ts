import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TodoListItem, TodoListItemList} from '../../../shared/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class AddTodoListService {

  private http = inject(HttpClient);

  appendTodoItem(formData: TodoListItem): Observable<any> {
    return this.http.post('/api/user/todos', formData);
  }
  updateTodoItems(formData: TodoListItemList): Observable<any> {
    return this.http.put('/api/user/todos', formData);
  }
}
