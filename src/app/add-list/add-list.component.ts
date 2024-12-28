import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-list',
  imports: [
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    `
      <button type="button" (click)="addItem()">Add Row</button>
      <button type="submit" [disabled]="!todoListForm.valid">Submit</button>
      <form [formGroup]="todoListForm" (ngSubmit)="onSubmit()">
        <div formArrayName="todoListItems">
          @for(item of todoListItems.controls; let i = $index ;track i){
            <div class="form">
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
      </form>
  `,
  styles:
    `
      [formArrayName]{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
  `
})
export class AddListComponent {
  private fb = inject(FormBuilder);

  todoListForm = this.fb.group({
    todoListItems: this.fb.array([])
  })
  get todoListItems(): FormArray {
    return this.todoListForm.get('todoListItems') as FormArray;
  }

  addItem(){
    const todoListItem = this.fb.group({
      title: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      finished: [false],
      priority: [0, [Validators.required]],
    });
    this.todoListItems.push(todoListItem);
  }

  removeTodoItem(index: number): void {
    this.todoListItems.removeAt(index);
  }

  onSubmit() {

  }
}
