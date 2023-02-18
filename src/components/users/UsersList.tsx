import { useQuery } from 'react-query';
import getData from '../../utils/api';
import Spinner from '../ui/Spinner';

export default function UsersList({user, setUser}) {

  const {data: users = [], status} = useQuery(
    'users', 
    () => getData('http://localhost:3001/users')
  );


  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
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