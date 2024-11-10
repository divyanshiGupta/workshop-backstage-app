import React from 'react';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';

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

// export const exampleUsers = {
//   results: [
//     {
//       gender: 'female',
//       name: {
//         title: 'Miss',
//         first: 'Carolyn',
//         last: 'Moore',
//       },
//       email: 'carolyn.moore@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Carolyn',
//       nat: 'GB',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Ms',
//         first: 'Esma',
//         last: 'Berberoğlu',
//       },
//       email: 'esma.berberoglu@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Esma',
//       nat: 'TR',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Ms',
//         first: 'Isabella',
//         last: 'Rhodes',
//       },
//       email: 'isabella.rhodes@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Isabella',
//       nat: 'GB',
//     },
//     {
//       gender: 'male',
//       name: {
//         title: 'Mr',
//         first: 'Derrick',
//         last: 'Carter',
//       },
//       email: 'derrick.carter@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Derrick',
//       nat: 'IE',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Miss',
//         first: 'Mattie',
//         last: 'Lambert',
//       },
//       email: 'mattie.lambert@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Mattie',
//       nat: 'AU',
//     },
//     {
//       gender: 'male',
//       name: {
//         title: 'Mr',
//         first: 'Mijat',
//         last: 'Rakić',
//       },
//       email: 'mijat.rakic@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Mijat',
//       nat: 'RS',
//     },
//     {
//       gender: 'male',
//       name: {
//         title: 'Mr',
//         first: 'Javier',
//         last: 'Reid',
//       },
//       email: 'javier.reid@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Javier',
//       nat: 'US',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Ms',
//         first: 'Isabella',
//         last: 'Li',
//       },
//       email: 'isabella.li@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Isabella',
//       nat: 'CA',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Mrs',
//         first: 'Stephanie',
//         last: 'Garrett',
//       },
//       email: 'stephanie.garrett@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Stephanie',
//       nat: 'AU',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Ms',
//         first: 'Antonia',
//         last: 'Núñez',
//       },
//       email: 'antonia.nunez@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Antonia',
//       nat: 'ES',
//     },
//     {
//       gender: 'male',
//       name: {
//         title: 'Mr',
//         first: 'Donald',
//         last: 'Young',
//       },
//       email: 'donald.young@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Donald',
//       nat: 'US',
//     },
//     {
//       gender: 'male',
//       name: {
//         title: 'Mr',
//         first: 'Iegor',
//         last: 'Holodovskiy',
//       },
//       email: 'iegor.holodovskiy@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Iegor',
//       nat: 'UA',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Madame',
//         first: 'Jessica',
//         last: 'David',
//       },
//       email: 'jessica.david@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Jessica',
//       nat: 'CH',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Ms',
//         first: 'Eve',
//         last: 'Martinez',
//       },
//       email: 'eve.martinez@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Eve',
//       nat: 'FR',
//     },
//     {
//       gender: 'male',
//       name: {
//         title: 'Mr',
//         first: 'Caleb',
//         last: 'Silva',
//       },
//       email: 'caleb.silva@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Caleb',
//       nat: 'US',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Miss',
//         first: 'Marcia',
//         last: 'Jenkins',
//       },
//       email: 'marcia.jenkins@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Marcia',
//       nat: 'US',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Mrs',
//         first: 'Mackenzie',
//         last: 'Jones',
//       },
//       email: 'mackenzie.jones@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Mackenzie',
//       nat: 'NZ',
//     },
//     {
//       gender: 'male',
//       name: {
//         title: 'Mr',
//         first: 'Jeremiah',
//         last: 'Gutierrez',
//       },
//       email: 'jeremiah.gutierrez@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Jeremiah',
//       nat: 'AU',
//     },
//     {
//       gender: 'female',
//       name: {
//         title: 'Ms',
//         first: 'Luciara',
//         last: 'Souza',
//       },
//       email: 'luciara.souza@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Luciara',
//       nat: 'BR',
//     },
//     {
//       gender: 'male',
//       name: {
//         title: 'Mr',
//         first: 'Valgi',
//         last: 'da Cunha',
//       },
//       email: 'valgi.dacunha@example.com',
//       picture: 'https://api.dicebear.com/6.x/open-peeps/svg?seed=Valgi',
//       nat: 'BR',
//     },
//   ],
// };

// type User = {
//   gender: string; // "male"
//   name: {
//     title: string; // "Mr",
//     first: string; // "Duane",
//     last: string; // "Reed"
//   };
//   email: string; // "duane.reed@example.com"
//   picture: string; // "https://api.dicebear.com/6.x/open-peeps/svg?seed=Duane"
//   nat: string; // "AU"
// };

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

  const { value, loading, error } = useAsync(async (): Promise<any> => {
    // Would use fetch in a real world example
    // return exampleUsers.results;
  }, []);

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

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

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
