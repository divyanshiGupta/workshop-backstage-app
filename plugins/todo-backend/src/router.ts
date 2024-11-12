import {
  HttpAuthService,
  PermissionsService,
} from '@backstage/backend-plugin-api';
import { InputError, NotAllowedError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import { TodoListService } from './services/TodoListService/types';
import { todoListDeletePermission } from '@internal/backstage-plugin-todo-list-common';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { AuthorizeResult } from '@backstage/plugin-permission-common';

export async function createRouter({
  httpAuth,
  todoListService,
  permissions,
}: {
  httpAuth: HttpAuthService;
  todoListService: TodoListService;
  permissions: PermissionsService;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  const permissionIntegrationRouter = createPermissionIntegrationRouter({
    permissions: [todoListDeletePermission],
  });

  router.use(permissionIntegrationRouter);

  // TEMPLATE NOTE:
  // Zod is a powerful library for data validation and recommended in particular
  // for user-defined schemas. In this case we use it for input validation too.
  //
  // If you want to define a schema for your API we recommend using Backstage's
  // OpenAPI tooling: https://backstage.io/docs/next/openapi/01-getting-started
  const todoSchema = z.object({
    title: z.string(),
  });

  router.post('/todos', async (req, res) => {
    const parsed = todoSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new InputError(parsed.error.toString());
    }

    const result = await todoListService.createTodo(parsed.data.title);

    res.status(201).json(result);
  });

  router.get('/todos', async (_req, res) => {
    res.json(await todoListService.listTodos());
  });

  router.delete('/todos/:id', async (req, res) => {
    const credentials = await httpAuth.credentials(req, { allow: ['user'] });
    const decision = (
      await permissions.authorize([{ permission: todoListDeletePermission }], {
        credentials,
      })
    )[0];

    if (decision.result === AuthorizeResult.DENY) {
      throw new NotAllowedError('Unauthorized');
    }

    res.json(await todoListService.deleteTodo(req.params.id));
  });

  return router;
}
