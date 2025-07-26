import React, { createContext, useState, useContext } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isWalletConnected, setWalletConnected] = useState(false); // Track wallet connection

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  const setConnectionStatus = (status) => {
    setWalletConnected(status); // Update wallet connection status
  };

  return (
    <LayoutContext.Provider value={{ isSidebarVisible, toggleSidebar, isWalletConnected, setConnectionStatus }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
