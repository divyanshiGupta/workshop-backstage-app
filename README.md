# Frontend plugin development workshop along with RBAC concepts

## Agenda

1. Create frontend plugin
2. Create common plugin and implement permissions for frontend plugin
3. Using RBAC plugin allow/deny guest user access to the newly created frontend plugin

## Prerequisite

1. Backstage app setup
2. Should be able to login via both Guest and Github

## Frontend plugin

Create new plugin using - `yarn new` and selecting `plugin`

Once the plugin is created add new nav item in sidebar inside file `packages/app/src/components/Root/Root.tsx`

```
<Sidebar>
    ...
    <SidebarGroup label="Menu" icon={<MenuIcon />}>
        ...
        <SidebarItem icon={<icon>} to=<route-id> text=<label> />
        ...
    </SidebarGroup>
    ...
</Sidebar>
```

Once the plugin is created start the app

```
yarn install
yarn dev
```

## Common plugin with permissions

Create a common plugin using - `yarn new`, and selecting `plugin-common`

Note: While adding name for plugin avoid adding common as it is automatically appended to the plugin name upon creation

Add `@backstage/plugin-permission-common` dependency in your common plugins `package.json`
`yarn --cwd plugins/<your-plugin> add @backstage/plugin-permission-common`

Create `permissions.ts` file in `src` and add the following from here

```
import { createPermission } from '@backstage/plugin-permission-common';

export const yourPluginViewPermission = createPermission({
  name: 'yourplugin.view.read',
  attributes: {
    action: 'read',
  },
});
```

## Use permission in frontend plugin

Add `@backstage/plugin-permission-react` dependency in your common plugins `package.json`
`yarn --cwd plugins/<your-plugin> add @backstage/plugin-permission-react`

Add the following in your component to hide the component if the access is not allowed

```
import { usePermission } from '@backstage/plugin-permission-react';
import { yourPluginViewPermission } from '@internal/backstage-plugin-your-plugin-common';

const yourPluginViewPermissionResult = usePermission({
  permission: yourPluginViewPermission,
});


if (!yourPluginViewPermissionResult.allowed)
 return (
    <EmptyState
    title="Permission required"
    description="To view your plugin, contact your administrator to give you the yourplugin.view.read permission"
    missing="data"
    />
 );
```

## Enable RBAC

Add RBAC frontend and backend plugins:

```
yarn --cwd packages/app add @janus-idp/backstage-plugin-rbac
yarn --cwd packages/backend add @janus-idp/backstage-plugin-rbac-backend
```

Now in `packages/backend/src/index.ts` remove the imported permission plugins and import `@janus-idp/backstage-plugin-rbac-backend`:

`backend.add(import('@janus-idp/backstage-plugin-rbac-backend'));`

In `packages/app/App.tsx` add the following route

```
import { RbacPage } from '@janus-idp/backstage-plugin-rbac';

<Route path="/rbac" element={<RbacPage />} />
```

And then add `Administration` nav item to the sidebar in file `packages/app/src/components/Root/Root.tsx`

```
import { Administration } from '@janus-idp/backstage-plugin-rbac';


<Administration />
```

In app-config.yaml add the following:

```
permission:
  enabled: true
  rbac:
    pluginsWithPermission:
      - catalog
      - permission
      - scaffolder
      - your-plugin
    admin:
      superUsers:
        - name: user:default/<user-entity-name>
```

Start the app

```
yarn install
yarn dev
```

Now you should be able to access RBAC UI

## Add permissions on frontend plugin

Login via Guest user and notice that the frontend plugin is not accessible

To provide access to the Guest user create a `rbac-policy.csv` file under `packages/backend` and add the following:

```
p, role:default/dev, yourplugin.view.read, read, allow
g, user:development/guest, role:default/dev
```

Now in `app-config.yaml` add absolute path to csv file

```
...
 admin:
    superUsers:
      - name: user:default/<user-entity-name>
 policies-csv-file: /Users/divgupta/code/workshop-backstage-app/packages/backend/rbac-policy.csv
 policyFileReload: true
```

Start the app `yarn dev`

Guest should now have access to the plugin
