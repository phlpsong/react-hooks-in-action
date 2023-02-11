import { Fragment, useState } from 'react';
import { users } from '../static.json';

export default function UsersList() {

  const [userIndex, setUserIndex] = useState(0);

  const user = users[userIndex];

  return (
    <Fragment>
      <div>
        <ul className="users items-list-nav">
          {users.map((u, i) => (
            <li
              key={u.id}
              className={i === userIndex ? 'selected' : undefined}
            >
              <button
                className="btn"
                onClick={() => setUserIndex(i)}
              >
                {u.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {user && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>
                {user.title}
              </h2>
            </div>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}