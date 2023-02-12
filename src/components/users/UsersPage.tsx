import { Fragment, useState } from 'react';
import UserDetail from './UserDetail';
import UsersList from './UsersList';

export default function UsersPage () {

  const [user, setUser] = useState(null);

  return (
    <main className="users-page">
      <Fragment>
        <UsersList user={user} setUser={setUser} />
        <UserDetail user={user} />
      </Fragment>
    </main>
  );
}