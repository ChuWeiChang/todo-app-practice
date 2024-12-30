import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FetchTodoListService} from '../fetch-todo-list.service';
import {AddTodoListService} from '../add-todo-list.service';
import {TodoListItem} from '../item.model';

@Component({
  selector: 'app-add-list',
  imports: [
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    `
      <button type="button" (click)="addItem()">Add Row</button>
      <br>
      <form [formGroup]="todoListForm" (ngSubmit)="onSubmit()">
        <br>
        <button type="submit" [disabled]="!todoListForm.valid">Submit</button>
        <br>
        <div class="form-container">
          <div formArrayName="todoListItems">
          @for(item of todoListItems.controls; let i = $index ;track item){
            <div [formGroupName]="i">
              <label for="title-{{ i }}">Title:</label>
              <input id="title-{{ i }}" type="text" formControlName="title">

              <label for="deadline-{{ i }}">Deadline: </label>
              <input id="deadline-{{ i }}" type="datetime-local" formControlName="deadline">

              <label for="finished-{{ i }}">Finished: </label>
              <input id="finished-{{ i }}" type="checkbox" formControlName="finished">

              <label for="priority-{{ i }}">Priority: </label>
              <input id="priority-{{ i }}" type="number" formControlName="priority" min="0">

              <button type="button" (click)="removeTodoItem(i)">Remove</button>
            </div>
          }
          </div>
        </div>
      </form>
  `,
  styles:
    `
      .form-container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
  `
})
export class AddListComponent implements OnInit {

  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);
  private FetchTodoListService = inject(FetchTodoListService);
  private addTodoListService = inject(AddTodoListService);

  todoListForm = this.fb.group({
    todoListItems: this.fb.array([])
  })
  get todoListItems(): FormArray {
    return this.todoListForm.get('todoListItems') as FormArray;
  }

  ngOnInit(): void {
    this.updateList()
  }

  addItem(){
    const todoListItem = this.fb.group({
      title: ['', [Validators.required]],
      deadline: [new Date().toISOString().slice(0, 16), [Validators.required]],
      finished: [false],
      priority: [0, [Validators.required]],
    });
    this.todoListItems.push(todoListItem);
  }

  removeTodoItem(index: number): void {
    this.todoListItems.removeAt(index);
  }

  onSubmit(): void {
    const formData = { todoListItems: this.todoListForm.value.todoListItems as TodoListItem[]};

    this.addTodoListService.updateTodoItems(formData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        alert("Successfully updated items");
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        alert("Failed to update items");
      }
    });
  }

  updateList() {
    this.FetchTodoListService.updateList().subscribe({
      next: (response) => {
        const todoListItems = response.todoListItems;
        if (todoListItems !== null) {
          this.todoListItems.clear();
          todoListItems.forEach(item => {
            const todoListItem = this.fb.group({
              title: [item.title, [Validators.required]],
              deadline: [item.deadline, [Validators.required]],
              finished: [item.finished],
              priority: [item.priority, [Validators.required]],
            });
            this.todoListItems.push(todoListItem);
            this.cdRef.markForCheck();
          });
        } else {
          console.log('Response body is null');
        }
      },
      error: (error) => {
        console.error('Error updating list:', error);
      }
    });
  }
}
