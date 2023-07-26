import { createContext } from "react";
import { UserLoginDTO } from "../interfaces/user.dto";

export type Auth = {
  user: UserLoginDTO | undefined;
};

export type AuthContextType = {
  authContext: Auth | undefined;
  setAuthContext: (context: Auth) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authContext: {
    user: undefined,
  },
  setAuthContext: () => {},
});