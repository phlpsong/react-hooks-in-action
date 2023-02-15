import { Fragment, useState } from 'react';
import UserDetail from './UserDetail';
import { useUser } from './UserProvider';
import UsersList from './UsersList';

export default function UsersPage () {
  const [user, setUser] = useState(null);
  // const {user: loggedInUser} = useContext(UserContext);

  const [loggedInUser] = useUser();

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