import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Layout from "../Layout";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Layout />;
};

export default ProtectedRoute;
