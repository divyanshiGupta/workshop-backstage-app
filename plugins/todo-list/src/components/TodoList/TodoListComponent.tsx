import React from 'react';
import { Grid } from '@material-ui/core';
import { Header, Page, Content } from '@backstage/core-components';
import { TodoListFetchComponent } from '../TodoListFetchComponent';

export const TodoListComponent = () => (
  <Page themeId="tool">
    <Header title="Todo list" />
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <TodoListFetchComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
