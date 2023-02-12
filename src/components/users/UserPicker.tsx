import { useEffect, useState } from 'react';
import Spinner from '../ui/Spinner';
import User from './User';

export default function UserPicker () {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(resp => resp.json())
      .then(data => setUsers(data));
  }, []);

  if (users.length === 0) {
    return <Spinner />;
  }

  return (
    <select>
      {users.map(u => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}