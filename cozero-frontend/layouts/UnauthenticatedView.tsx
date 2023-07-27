import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router";
import { AuthProps } from "../interfaces/auth.interface";

export default function UnauthenticatedView({ children, to }: AuthProps) {
  const { authContext } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(to);
  to ??= "/";
  console.log(to);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    console.log(authContext?.user?.access_token);
    if (authContext?.user?.access_token) {
      navigate("/");
    }
  }, []);

  if (!authContext?.user?.access_token) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
