import {
  coreServices,
  createBackendPlugin,
  resolvePackagePath,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';
import { createTodoListService } from './services/TodoListService';

/**
 * todoPlugin backend plugin
 *
 * @public
 */
export const todoPlugin = createBackendPlugin({
  pluginId: 'todo',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        database: coreServices.database,
        permissions: coreServices.permissions,
      },
      async init({
        logger,
        auth,
        httpAuth,
        httpRouter,
        database,
        permissions,
      }) {
        const client = await database.getClient();

        const migrationsDir = resolvePackagePath(
          '@internal/backstage-plugin-todo-backend',
          'migrations',
        );
        if (!database.migrations?.skip) {
          await client.migrate.latest({
            directory: migrationsDir,
          });
        }
        logger.info('Todo plugin migration successful');

        const todoListService = new createTodoListService(client);
        httpRouter.use(
          await createRouter({
            httpAuth,
            todoListService,
            permissions,
          }),
        );

        // httpRouter.addAuthPolicy({
        //   path: '/',
        //   allow: 'unauthenticated',
        // });
      },
    });
  },
});
