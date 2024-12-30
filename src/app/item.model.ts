export interface TodoListItem {
  title: string;
  deadline: string;
  finished: boolean;
  priority: number;
}
export interface TodoListItemList{
  todoListItems: TodoListItem[];
}
