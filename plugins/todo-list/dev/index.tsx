import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { todoListPlugin, TodoListPage } from '../src/plugin';

createDevApp()
  .registerPlugin(todoListPlugin)
  .addPage({
    element: <TodoListPage />,
    title: 'Root Page',
    path: '/todo-list',
  })
  .render();
