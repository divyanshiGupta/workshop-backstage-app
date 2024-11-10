import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const todoListPlugin = createPlugin({
  id: 'todo-list',
  routes: {
    root: rootRouteRef,
  },
});

export const TodoListPage = todoListPlugin.provide(
  createRoutableExtension({
    name: 'TodoListPage',
    component: () =>
      import('./components/TodoList').then(m => m.TodoListComponent),
    mountPoint: rootRouteRef,
  }),
);
