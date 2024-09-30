import { Navigate, Outlet } from "react-router-dom";

export default function AdminMiddleware() {
  // const userInfo = useContext(UserContext);

  // if (!token.getUser() || token.getUser().role.name !== 'Admin')
  //     return <Navigate to="/" />;

  // if (userInfo.user.role.name !== 'Admin')
  //     return <Navigate to="/" />;

  return <Outlet />;
}
