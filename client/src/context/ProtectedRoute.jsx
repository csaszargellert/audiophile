import {
  Navigate,
  Outlet,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const { userIsAuthenticated, userRoles } = useRouteLoaderData("root");
  const location = useLocation();
  return allowedRoles.every((role) => userRoles?.includes(role)) ? (
    <Outlet />
  ) : userIsAuthenticated ? (
    <Navigate to="/unauthorized" replace state={{ from: location }} />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default ProtectedRoute;
