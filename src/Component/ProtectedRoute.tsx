import { Navigate, Outlet } from "react-router-dom";
import AuthProvider from "../AuthProvider";

function ProtectedRoute() {
  const { user, loading } = AuthProvider();

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
