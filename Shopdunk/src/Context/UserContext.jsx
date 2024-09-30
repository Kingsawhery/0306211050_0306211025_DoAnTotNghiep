import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    isLoggedIn: false,
    username: "",
  });

  return (
    <UserContext.Provider user={user} setUser={setUser}>
      {children}
    </UserContext.Provider>
  );
};
