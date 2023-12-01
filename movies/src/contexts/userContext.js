import React, { useState } from "react";

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState()

  const logIn = () => {
    setLoggedIn( true )
  };
  
  // We will use this function in a later section
  const logOut = () => {
    setLoggedIn( false )
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        logIn,
        logOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;