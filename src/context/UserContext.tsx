import { createContext, useContext } from "react";
import useUser from "../hooks/useUser";

const UserContext = createContext<UserState | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userState = useUser();
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};