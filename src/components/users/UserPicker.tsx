import { useContext, useEffect, useState } from 'react';
import Spinner from '../ui/Spinner';
import User from './User';
import UserContext from './UserContext';

export default function UserPicker () {

  const [users, setUsers] = useState<User[]>([]);
  const {user, setUser} = useContext(UserContext);
  
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(resp => resp.json())
      .then(data => {
        setUsers(data);
        setUser(data[0]);
      });
  }, [setUser]);

  function handleSelect (e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find(u => u.id === selectedID);

    setUser(selectedUser);
  }

  if (users.length === 0) {
    return <Spinner />;
  }

  return (
    <select
      onChange={handleSelect}
      value={user?.id}
    >
      {users.map(u => (
        <option key={u.id} value={u.id}>{u.name}</option>
      ))}
    </select>
  );
}