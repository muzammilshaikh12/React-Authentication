import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const loggedin = !!token;
  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValues = {
    token: token,
    isLoggedIn: loggedin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContextProvider value={contextValues}>
      {props.children}
    </AuthContextProvider>
  );
};

export default AuthContext
