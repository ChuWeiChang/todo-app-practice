import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TodoListItem} from '../../../shared/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class FetchTodoListService {
  private http = inject(HttpClient);

  updateList(): Observable<{ todoListItems: TodoListItem[] }> {
    return this.http.get<{ todoListItems: TodoListItem[] }>('/api/user/todos');
  }
}
