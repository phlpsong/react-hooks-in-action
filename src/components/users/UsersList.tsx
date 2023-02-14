import { useEffect, useState } from 'react';
import getData from '../../utils/api';
import Spinner from '../ui/Spinner';
import User from './User';

export default function UsersList({user, setUser}) {
  
  // include state for an error object and an isLoading flag
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  // const [userIndex, setUserIndex] = useState(0);

  // const user = users?.[userIndex];

  useEffect(() => {
    getData('http://localhost:3001/users')
      .then(users => {
        // setUser(users[0]);
        setUsers(users);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error); // set the error object
        setIsLoading(false); // we're no longer loading
      });
  }, [setUser]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p><Spinner /> Loading users... </p>;
  }

  return (
    <div>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li
            key={u.id}
            className={u.id === user?.id ? 'selected' : undefined}
          >
            <button
              className="btn"
              onClick={() => {
                console.log(`user: ${JSON.stringify(u)}`);
                setUser(u);
              }}
            >
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}