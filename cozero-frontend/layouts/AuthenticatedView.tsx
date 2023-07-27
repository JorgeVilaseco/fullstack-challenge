import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthProps } from "../interfaces/auth.interface";
import LocalStorageService from "../services/LocalStorageService";

export default function AuthenticatedView({ children, to }: AuthProps) {
  const token = LocalStorageService.getJwtToken();
  console.log(token);
  const navigate = useNavigate();
  to ??= "/sign-in";

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!token) {
      navigate(to);
    }
  }, []);

  if (token) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
