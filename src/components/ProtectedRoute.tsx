import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";

type Props = {
  requiredPermissions: string[];
  children: React.ReactNode;
};

export default function ProtectedRoute({
  requiredPermissions,
  children,
}: Props): React.ReactNode {
  const { user, isAuthenticated } = useAuth();

  const isAuthorized =
    isAuthenticated &&
    user?.permissions.some((permission) =>
      requiredPermissions.includes(permission),
    );

  return isAuthorized ? children : <Navigate to="/" replace />;
}
