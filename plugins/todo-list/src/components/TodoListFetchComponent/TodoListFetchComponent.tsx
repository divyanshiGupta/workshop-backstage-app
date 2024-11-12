import React from 'react';
import { EmptyState } from '@backstage/core-components';

import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Container,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import { usePermission } from '@backstage/plugin-permission-react';
import { todoListViewPermission } from '@internal/backstage-plugin-todo-list-common';

const useStyles = makeStyles({
  input: {
    width: '70%',
    marginBottom: 30,
  },
  addButton: {
    height: 55,
    marginBottom: 30,
  },
  container: {
    textAlign: 'center',
    marginTop: 100,
  },
  list: { width: '80%', margin: '0px 100px' },
  listItem: {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid light-gray',
  },
  text: {
    width: '70%',
  },
  listButtons: {
    marginLeft: 10,
  },
});

export const TodoListFetchComponent = () => {
  const [inputVal, setInputVal] = useState('');
  const [todos, setTodos] = useState<any>([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId] = useState(null);
  const classes = useStyles();

  const todoListViewPermissionResult = usePermission({
    permission: todoListViewPermission,
  });

  const onChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: new Date().getTime() },
      ]);
    } else {
      setTodos([...todos, { val: inputVal, isDone: false, id: editedId }]);
    }
    setInputVal('');
    setIsEdited(false);
  };

  const onDelete = (id: any) => {
    const newTodos = todos.filter((todo: any) => todo.id !== id);
    setTodos(newTodos);
  };

  if (!todoListViewPermissionResult.allowed)
    return (
      <EmptyState
        title="Permission required"
        description="To view Todo list, contact your administrator to give you the todolist.view.read permission"
        missing="data"
      />
    );

  return (
    <Container component="main" className={classes.container}>
      <TextField
        variant="outlined"
        onChange={onChange}
        label="Type your task"
        value={inputVal}
        className={classes.input}
      />
      <Button
        size="large"
        variant={isEdited ? 'outlined' : 'contained'}
        color="primary"
        onClick={handleClick}
        className={classes.addButton}
        disabled={inputVal ? false : true}
      >
        {isEdited ? 'Edit Task' : 'Add Task'}
      </Button>
      <List className={classes.list}>
        {todos.map((todo: any) => {
          return (
            <>
              <ListItem divider className={classes.listItem}>
                <Typography
                  className={classes.text}
                  style={{ color: todo.isDone ? 'green' : '' }}
                  key={todo.id}
                >
                  {todo.val}
                </Typography>
                <Button
                  onClick={() => onDelete(todo.id)}
                  color="secondary"
                  variant="contained"
                  className={classes.listButtons}
                >
                  delete
                </Button>
              </ListItem>
            </>
          );
        })}
      </List>
    </Container>
  );
};
