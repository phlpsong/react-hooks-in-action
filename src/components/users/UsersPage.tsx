import { Fragment, useContext, useState } from 'react';
import UserContext from './UserContext';
import UserDetail from './UserDetail';
import UsersList from './UsersList';

export default function UsersPage () {
  const [user, setUser] = useState(null);
  const {user: loggedInUser} = useContext(UserContext);

  // if no user has been selected in the users list,
  // select the logged in user
  const currentUser = user || loggedInUser;

  return (
    <main className="users-page">
      <Fragment>
        <UsersList user={currentUser} setUser={setUser} />
        <UserDetail user={currentUser} />
      </Fragment>
    </main>
  );
}