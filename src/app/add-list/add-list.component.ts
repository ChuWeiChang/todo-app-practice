import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-list',
  imports: [
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    `
      <button type="button" (click)="addItem()">Add Row</button>
      <form [formGroup]="todoListForm" (ngSubmit)="onSubmit()">
        <button type="submit" [disabled]="!todoListForm.valid">Submit</button>
        <div class="form-container">
          <div formArrayName="todoListItems">
          @for(item of todoListItems.controls; let i = $index ;track i){
            <div [formGroupName]="i">
              <label for="title-{{ i }}">Title: </label>
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
export class AddListComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  todoListForm = this.fb.group({
    todoListItems: this.fb.array([])
  })
  get todoListItems(): FormArray {
    return this.todoListForm.get('todoListItems') as FormArray;
  }

  addItem(){
    const todoListItem = this.fb.group({
      title: ['', [Validators.required]],
      deadline: [new Date().toString(), [Validators.required]],
      finished: [false],
      priority: [0, [Validators.required]],
    });
    this.todoListItems.push(todoListItem);
  }

  removeTodoItem(index: number): void {
    this.todoListItems.removeAt(index);
  }

  onSubmit(): void {
    console.log("fewfewf");
    const payload = this.todoListForm.value;
    this.http.post('/api/add', payload).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        this.todoListForm.reset();
      },
      error: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  }
}