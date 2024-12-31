import { TestBed } from '@angular/core/testing';

import { FetchTodoListService } from './fetch-todo-list.service';

describe('FetchTodoListService', () => {
  let service: FetchTodoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchTodoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
