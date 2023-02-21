import { Fragment, Suspense, useState } from 'react';
import { useQueryClient } from 'react-query';
import getData from '../../utils/api';
import PageSpinner from '../ui/PageSpinner';
import UserDetail from './UserDetail';
import { useUser } from './UserProvider';
import UsersList from './UsersList';

export default function UsersPage () {
  const [loggedInUser] = useUser();

  const [selectedUser, setSelectedUser] = useState(null);
  const queryClient = useQueryClient();

  // if no user has been selected in the users list,
  // select the logged in user
  const user = selectedUser || loggedInUser;

  function switchUser(nextUser) {
    setSelectedUser(nextUser);
    queryClient.prefetchQuery(
      ['user', nextUser.id],
      () => getData(`http://localhost:3001/users/${nextUser.id}`)
    );

    queryClient.prefetchQuery(`http://localhost:3001/img/${nextUser.img}`, () => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = `http://localhost:3001/img/${nextUser.img}`;
    }
    ));
  }

  return user ? (
    <main className="users-page">
      <Fragment>
        <UsersList user={user} setUser={setSelectedUser} />
        <Suspense fallback={<PageSpinner />}>
          <UserDetail userID={user.id} />
        </Suspense>
      </Fragment>
    </main>
  ) : <PageSpinner/>;
}