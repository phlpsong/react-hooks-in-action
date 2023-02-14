import { useState } from 'react';
import UserContext, { UserSetContext } from './UserContext';

export function UserProvider ({children}) {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
}