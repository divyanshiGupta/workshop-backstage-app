import { Knex } from 'knex';
import { TodoItem, TodoListService } from './types';

// export class createTodoListService implements TodoListService {
//   private todos: TodoItem[] = [];

//   async createTodo(title: string): Promise<TodoItem> {
//     const todo: TodoItem = {
//       id: `${this.todos.length + 1}`,
//       title,
//       completed: false,
//     };
//     this.todos.push(todo);
//     return todo;
//   }

//   async listTodos(): Promise<{ items: TodoItem[] }> {
//     return { items: this.todos };
//   }
//   async deleteTodo(id: string): Promise<void> {
//     this.todos = this.todos.filter(todo => todo.id !== id);
//   }
// }

export class createTodoListService implements TodoListService {
  private db;

  constructor(client: Knex) {
    this.db = client;
  }
  async createTodo(title: string): Promise<TodoItem> {
    const [todo] = await this.db.table('todos').insert(
      {
        title,
        completed: false,
      },
      ['*'],
    );
    return todo;
  }

  async listTodos(): Promise<{ items: TodoItem[] }> {
    const todos = await this.db.table('todos').select('*').orderBy('id');
    return { items: todos };
  }

  async deleteTodo(id: string): Promise<void> {
    await this.db.table('todos').where({ id }).del();
  }
}
