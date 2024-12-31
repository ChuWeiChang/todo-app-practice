import { TestBed } from '@angular/core/testing';

import { AddTodoListService } from './add-todo-list.service';

describe('AddTodoListService', () => {
  let service: AddTodoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTodoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
