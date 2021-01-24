import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor from '../src';
import { useState } from 'react';
import { User } from '../src/sync';

const users = [
  {
    name: 'Trillian McMillan',
    color: '#264653',
  },
  {
    name: 'Arthur Dent',
    color: '#2A9D8F',
  },
  {
    name: 'Slartibartfast',
    color: '#E9C46A',
  },
  {
    name: 'Ford Prefect',
    color: '#f4a261',
  },
  {
    name: 'Marvin',
    color: '#e76f51',
  },
];

const App = () => {
  const [user, setUser] = useState<User>();
  return (
    <div>
      <h1>Society - The collobartive editor</h1>
      <h2>{user ? `Connected as ${user.name}` : 'Not connected'}</h2>
      <div>
        <div>
          {users.map(user => (
            <button key={user.name} onClick={() => setUser(user)}>
              Connect as {user.name}
            </button>
          ))}
        </div>
      </div>
      {user ? <Editor user={user} /> : <p>Please select a user</p>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
