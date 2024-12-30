import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-quick-add-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <div class="form-container">
        <form class="formGroup" [formGroup]="newTodoForm" (ngSubmit)="onSubmit()">
          <label for="title">Title:</label>
          <input id="title" type="text" formControlName="title">

          <label for="deadline">Deadline: </label>
          <input id="deadline" type="datetime-local" formControlName="deadline">

          <label for="finished">Finished: </label>
          <input id="finished" type="checkbox" formControlName="finished">

          <label for="priority">Priority: </label>
          <input id="priority" type="number" formControlName="priority" min="0">

          <button type="submit" [disabled]="!newTodoForm.valid">Add Todo</button>
        </form>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Close</button>
    </mat-dialog-actions>
  `,
  styles:`
    .formGroup{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
  `
})
export class QuickAddPanelComponent {
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  newTodoForm = this.fb.group({
    title: ['', [Validators.required]],
    deadline: [new Date().toISOString().slice(0, 16), [Validators.required]],
    finished: [false],
    priority: [0, [Validators.required]],
  });
  onSubmit(){
    const formData = this.newTodoForm.value;
    const headers = new HttpHeaders().set('Authorization', this.data.sessionKey);
    this.http.post('/api/append-list', formData, { headers}).subscribe({
      next: () => {
        alert("successfully add new item");
        this.newTodoForm.reset({
          title: '',
          deadline: new Date().toISOString().slice(0, 16),
          finished: false,
          priority: 0,
        });
      },
      error: (err) => {
        alert("add new item failed");
        console.error('Error adding new item:', err);
      },
    });
  }

}
