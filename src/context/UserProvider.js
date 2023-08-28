import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userId: null,
    userName: null
  });

  const setUser = (newUserId, newUserName) => {
    setUserData({
      userId: newUserId,
      userName: newUserName
    });
  };

  return (
    <UserContext.Provider 
      value={{ userData, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};