// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    // Si no es admin, redirige a la página de inicio o a otra página
    return <Navigate to="/" />;
  }

  return children; // Si es admin, renderiza los hijos
};

export default ProtectedRoute;