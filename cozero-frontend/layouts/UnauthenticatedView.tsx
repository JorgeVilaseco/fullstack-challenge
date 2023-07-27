import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthProps } from "../interfaces/auth.interface";
import LocalStorageService from "../services/LocalStorageService";

export default function UnauthenticatedView({ children, to }: AuthProps) {
  const token = LocalStorageService.getJwtToken();
  const navigate = useNavigate();
  console.log(to);
  to ??= "/";
  console.log(to);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (token) {
      navigate("/");
    }
  }, []);

  if (!token) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
