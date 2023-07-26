import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth";
import { UserLoginDTO, UserRegistrationDTO } from "../interfaces/user.dto";
import LocalStorageService from "../services/LocalStorageService";
import UserService from "../services/UserService";

export const useAuth = () => {
  const { authContext, setAuthContext } = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();

  const signIn = async (user: UserRegistrationDTO) => {
    const loggedUser = await UserService.login(user);
    setAuthContext({
      ...authContext,
      user: loggedUser,
    });
    LocalStorageService.setItem("user", loggedUser);
    if (loggedUser) {
      navigate("/");
      return;
    }

    return null;
  };

  const signUp = useCallback(async (user: UserRegistrationDTO) => {
    const createdUser = await UserService.register(user);
    if (createdUser) {
      LocalStorageService.setItem("user", createdUser);
    }

    setAuthContext({
      ...authContext,
      user: createdUser,
    });

    navigate("/");
    return createdUser;
  }, []);

  const signOut = () => {
    setAuthContext({
      ...authContext,
      user: undefined,
    });

    LocalStorageService.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const user = LocalStorageService.getItem<UserLoginDTO>("user");
    if (user) {
      setAuthContext({
        ...authContext,
        user,
      });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      LocalStorageService.removeItem("user");
      return;
    }

    LocalStorageService.setItem("user", user);
  }, [user]);

  return { user, logIn: signIn, signOut, signUp };
};