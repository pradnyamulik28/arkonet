// TokenContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token has expired, log the user out
          logout();
        }
      }
    };

    // Check token expiration when the component mounts
    checkTokenExpiration();

    // Optionally, you can set up periodic checks using setInterval if needed

    return () => {
      // Cleanup, e.g., clear the interval if you set up periodic checks
    };
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsTokenExpired(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsTokenExpired(true);
    // You can also redirect the user to a logout page or login page here
  };

  return (
    <TokenContext.Provider value={{ token, isTokenExpired, login, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
