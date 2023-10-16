import React, { createContext, useState, useEffect,useHistory } from 'react';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // 检查 localStorage 是否有 token，如果有则设置 isAuthenticated 为 true
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
