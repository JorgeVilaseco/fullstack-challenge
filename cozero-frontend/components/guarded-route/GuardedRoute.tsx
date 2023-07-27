import { Navigate, Outlet } from "react-router-dom";

export const GuardedRoute = ({
  isAuthenticated = false,
  redirectRoute = "/",
}): JSX.Element => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectRoute} />;
};
