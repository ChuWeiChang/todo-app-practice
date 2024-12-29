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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginStateService} from '../login-state.service';

export interface TodoListItem {
  title: string;
  deadline: string;
  finished: boolean;
  priority: number;
}


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
  displayedColumns: string[] = ['title', 'deadline', 'finished', 'priority'];
  dataSource = new ExampleDataSource();
  ngOnInit(): void {
    this.dataSource.updateData();
  }
}
export class ExampleDataSource extends DataSource<TodoListItem> {
  /** Stream of data that is provided to the table. */
  private dataSubject = new BehaviorSubject<TodoListItem[]>([]);
  data = this.dataSubject.asObservable();

  loginState = inject(LoginStateService);
  http = inject(HttpClient);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TodoListItem[]> {
    return this.data;
  }

  disconnect() {}

  /** Update the data by fetching from the API */
  updateData() {
    const headers = new HttpHeaders().set('Authorization', this.loginState.sessionKey());
    this.http.get<{ todoListItems: TodoListItem[] }>('/api/list', { headers, observe: 'response' }).subscribe({
      next: (response) => {
        const body = response.body;
        if (body && body.todoListItems) {
          this.dataSubject.next(body.todoListItems);
          console.log('Fetched todoListItems:', body.todoListItems);
        } else {
          console.log('Response body is null or empty.');
        }
      },
      error: (error) => {
        console.error('Error updating list:', error);
      }
    });
  }
}
