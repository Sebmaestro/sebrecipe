import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute() {
  const { username, isLoading } = useAuth();

  if (isLoading) return null;
  if (!username) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
