import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// PrivateRoute: untuk proteksi route, bisa cek status paid
const PrivateRoute: React.FC<{ requiredPaid?: boolean }> = ({
  requiredPaid = false,
}) => {
  const { user, paid, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    // Belum login, redirect ke login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPaid && !paid) {
    // Sudah login tapi belum paid
    return (
      <div className="text-red-500 p-4">
        You need to be a paid member to access this course.
      </div>
    );
  }

  // Sudah login dan (jika perlu) sudah paid
  return <Outlet />;
};

export default PrivateRoute;
