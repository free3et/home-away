import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserContextProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  ready: boolean;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
  ready: false,
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
