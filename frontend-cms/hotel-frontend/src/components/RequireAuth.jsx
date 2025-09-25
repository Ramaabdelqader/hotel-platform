import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RequireAuth({ children, roles }) {
  const { user } = useAuth(); // user من الـ JWT: { id, email, role }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/login" />; // أو صفحة Forbidden
  }

  return children;
}
