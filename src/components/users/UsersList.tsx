import { useQuery } from 'react-query';
import getData from '../../utils/api';
import Spinner from '../ui/Spinner';
import ButtonPending from './ButtonPending';

export default function UsersList({user, setUser, isPending}) {

  const {data: users = []} = useQuery(
    'users', 
    () => getData('http://localhost:3001/users'),
    {
      suspense: true
    }
  );

  return (
    <div>
      <ul className="users items-list-nav">
        {users.map((u) => (
          <li
            key={u.id}
            className={u.id === user?.id ? 'selected' : undefined}
          >
            <ButtonPending
              className="btn"
              onClick={() => setUser(u)}
            >
              {isPending && <Spinner/>} {u.name} {isPending && <Spinner/>}
            </ButtonPending>
          </li>
        ))}
      </ul>
    </div>
  );
}