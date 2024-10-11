import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

interface ProtectedRouteProps {
  role: "ROLE_ADMIN" | "ROLE_USER";
  children: JSX.Element;
}

const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
  const { token, infoCurrent } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== infoCurrent?.role?.roleName) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
