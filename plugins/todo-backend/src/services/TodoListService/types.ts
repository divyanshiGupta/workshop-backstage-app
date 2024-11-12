export interface TodoItem {
  title: string;
  id: string;
  completed: boolean;
}

export interface TodoListService {
  createTodo(title: string): Promise<TodoItem>;
  listTodos(): Promise<{ items: TodoItem[] }>;
  deleteTodo(id: string): Promise<void>;
}
