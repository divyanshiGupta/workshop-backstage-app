import { createPermission } from '@backstage/plugin-permission-common';

export const todoListViewPermission = createPermission({
  name: 'todolist.view.read',
  attributes: {
    action: 'read',
  },
});

/**
 * List of all permissions on permission polices.
 */
export const todolistPermissions = [todoListViewPermission];
