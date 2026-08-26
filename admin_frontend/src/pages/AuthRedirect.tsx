import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type AuthRedirectProp = {
  children: ReactNode;
};

const AuthRedirect = ({ children }: AuthRedirectProp) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
