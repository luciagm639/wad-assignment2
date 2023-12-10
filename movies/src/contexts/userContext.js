import React, { useState } from "react";

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [username, setUsername] = useState()
  const [token, setToken] = useState()

  const logIn = (username) => {
    setUsername( username )
  };
  
  // We will use this function in a later section
  const logOut = (username) => {
    setUsername( username )
  };

  return (
    <UserContext.Provider
      value={{
        username,
        logIn,
        logOut,
        token,
        setToken
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;