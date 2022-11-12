import { createContext, useState } from "react";

interface AuthProviderValue {
  user: string,
  signIn: (newUser: string, cb: () => void) => void,
  signOut: (cb: () => void) => void
}

export const AuthContext = createContext<AuthProviderValue>({} as AuthProviderValue);

type AuthProviderProps = {
  children: React.ReactElement;
}


export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState('');

  const signIn = (newUser: string, cb: () => void) => {
    setUser(newUser);
    cb();
  };
  
  const signOut = (cb: () => void) => {
    setUser('');
    cb();
  };

  const value = {user, signIn, signOut};

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
