import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element: Component }: any) => {
  const location = useLocation();
  if (location.state && location.state.book) {
    return <Component book={location.state.book} />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
