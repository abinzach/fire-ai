import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import authentication instance from Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'; // Import authentication functions from Firebase

const AuthContext = createContext(); // Create authentication context

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({}); // State to store user information

  // Function to sign up a user with email and password
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
  }

  // Function to log in a user with email and password
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Function to log out the current user
  function logOut() {
    return signOut(auth);
  }

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state with the current user
    });
    return () => {
      unsubscribe(); // Unsubscribe from the authentication state change listener
    };
  }, []);

  // Provide authentication context value to children components
  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context
export function UserAuth() {
  return useContext(AuthContext);
}
