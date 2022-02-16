import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const localUser=JSON.parse(window.localStorage.getItem('user'));
  const [user, setUser] = useState(localUser || null);
  console.log(user);
  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider };
export default UserContext;

