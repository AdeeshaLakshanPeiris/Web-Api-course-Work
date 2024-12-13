import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulate a logged-in user with dummy data
  useEffect(() => {
    const dummyUser = {
      id: "675bc517317e945aa3915b88",
      name: "John Doe",
      email: "johndoe@example.com",
      role: "passenger", // roles can be 'admin', 'driver', or 'passenger'
    };
    setUser(dummyUser); // Automatically log in the dummy user
  }, []);

  const login = (userData) => setUser(userData); // In case login functionality is needed later
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
