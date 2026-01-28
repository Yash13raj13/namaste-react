import { createContext } from "react";

export interface UserContextType {
  loggedInUser: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType>({
  loggedInUser: "Default User",
  setUserName: () => {}, // fallback empty function
});

export default UserContext;
