import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';


const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId)
}));


export const App = () => {

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [select, setSelect] = useState(0);
  const [selectError, setSelectError] = useState(false);

  const [todos, setTodos] = useState(initialTodos)


  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
    setTitleError(true);
    }

    if (!select) {
      setSelectError(true);
    }

    if (!title.trim() || !select) {
      return;
    }


    const selectedUser = usersFromServer.find(user => user.id === select)
    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId: select,
      completed: false,
      user: selectedUser
    }

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelect(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input type="text" data-cy="titleInput" value={title} placeholder="What needs to be done?" onChange={(event) => {
            setTitle(event.target.value);
            setTitleError(false);
          }} />
          {titleError && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <select data-cy="userSelect" value={select} onChange={event => {
            setSelect(Number(event.target.value));
            setSelectError(false);
          }}>
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <>
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              </>

            ))}

          </select>
          {selectError && <span className="error">Please choose a user</span>}


        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos}/>
    </div>
  );
};
