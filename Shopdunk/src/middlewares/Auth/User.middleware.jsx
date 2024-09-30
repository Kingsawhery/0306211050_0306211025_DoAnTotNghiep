import React from "react";
import { useUser } from "../../Context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function UserMiddleware() {
  const { user, isLoading } = useUser();

  // Show a loading message while fetching user info
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // If user is not logged in, allow access to the protected routes
  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

function GuestMiddleware() {
  const { user, isLoading } = useUser();
  console.log(user, isLoading);

  // Show a loading message while fetching user info
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // If user is logged in, redirect to home
  if (user.isLoggedIn === true) {
    return <Navigate to="/../" />;
  }
  console.log(user, isLoading);

  return <Outlet />;
}

export { UserMiddleware, GuestMiddleware };
