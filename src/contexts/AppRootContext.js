import React, { createContext, useState } from "react";

const AppRootContext = createContext();

const AppRootContextProvider = ({ children }) => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [socket, setSocket] = useState();

  return <AppRootContext.Provider value={{ navIsVisible, setNavIsVisible, socket, setSocket }}>{children}</AppRootContext.Provider>;
};

export { AppRootContext, AppRootContextProvider };
