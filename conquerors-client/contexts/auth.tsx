import React, { createContext } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    token: '',
    refreshToken: '',
  });

  const setUserAuthInfo = (data ) => {
    const token = localStorage.setItem('token', data.access_token);
    const refreshToken = localStorage.setItem('refresh_token', data.refresh_token);
    setAuthState({ token, refreshToken });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');
    return token && refreshToken ? true : false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setAuthState({ token: '', refreshToken: '' });
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        logout: () => logout(),
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
