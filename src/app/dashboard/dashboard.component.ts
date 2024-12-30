import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  CdkCell,
  CdkCellDef, CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
  CdkHeaderRow, CdkHeaderRowDef,
  CdkRow,
  CdkRowDef, CdkTable
} from '@angular/cdk/table';
import {LoginStateService} from '../login-state.service';
import {MatDialog} from '@angular/material/dialog';
import {QuickAddPanelComponent} from '../quick-add-panel/quick-add-panel.component';
import {FetchTodoListService} from '../fetch-todo-list.service';

export interface TodoListItem {
  title: string;
  deadline: string;
  finished: boolean;
  priority: number;
}


// noinspection AngularUnusedComponentImport
@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkRow,
    CdkHeaderRow,
    CdkHeaderCell,
    CdkCell,
    CdkHeaderCellDef,
    CdkCellDef,
    CdkRowDef,
    CdkColumnDef,
    CdkHeaderRowDef,
    CdkTable
  ],
  template:`
    <button (click)="quickAdd()">Quick add todo item</button>
    <br>
    <div class="dashboard-container">
      <table cdk-table [dataSource]="dataSource">

        <ng-container cdkColumnDef="title">
          <th cdk-header-cell *cdkHeaderCellDef> title </th>
          <td cdk-cell *cdkCellDef="let element"> {{element.title}} </td>
        </ng-container>

        <ng-container cdkColumnDef="deadline">
          <th cdk-header-cell *cdkHeaderCellDef> deadline </th>
          <td cdk-cell *cdkCellDef="let element"> {{element.deadline}} </td>
        </ng-container>

        <ng-container cdkColumnDef="finished">
          <th cdk-header-cell *cdkHeaderCellDef> finished </th>
          <td cdk-cell *cdkCellDef="let element"> {{element.finished}} </td>
        </ng-container>

        <ng-container cdkColumnDef="priority">
          <th cdk-header-cell *cdkHeaderCellDef> priority </th>
          <td cdk-cell *cdkCellDef="let element"> {{element.priority}} </td>
        </ng-container>

        <tr cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
        <tr cdk-row *cdkRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles:`
    table {
      width: 50%;
    }
    th {
      text-align: left;
    }
  `
})
export class DashboardComponent implements OnInit{
  loginState = inject(LoginStateService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['title', 'deadline', 'finished', 'priority'];
  dataSource = new ExampleDataSource();
  ngOnInit(): void {
    this.dataSource.updateData();
  }
  quickAdd() {
    const title = 'Quick add';
    const dialogRef =this.dialog.open(QuickAddPanelComponent, {
      data: {
        title: title,
        sessionKey: this.loginState.sessionKey()
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataSource.updateData();
    });
  }

}
export class ExampleDataSource extends DataSource<TodoListItem> {
  /** Stream of data that is provided to the table. */
  private dataSubject = new BehaviorSubject<TodoListItem[]>([]);
  data = this.dataSubject.asObservable();
  private FetchTodoListService = inject(FetchTodoListService);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TodoListItem[]> {
    return this.data;
  }

  disconnect() {}

  /** Update the data by fetching from the API */
  updateData() {
    this.FetchTodoListService.updateList().subscribe({
      next: (response) => {
        const todoListItems = response.todoListItems;
        todoListItems.sort((a, b) => {
          const deadlineA = new Date(a.deadline).getTime();
          const deadlineB = new Date(b.deadline).getTime();
          return deadlineA - deadlineB;
        });
        this.dataSubject.next(todoListItems.slice(0, 10));

        console.log('Fetched todoListItems:', todoListItems);
      },
      error: (error) => {
        console.error('Error updating list:', error);
      }
    });
  }
}


