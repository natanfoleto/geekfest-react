import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import useGetUserPermissions from "../hooks/useGetUserPermissions";

interface PermissionGateProps {
  children: React.ReactNode;
  permissions: string[];
  isPage?: boolean;
}

export function PermissionGate({
  children,
  permissions,
  isPage = false,
}: PermissionGateProps) {
  const userPermissions = useGetUserPermissions();

  if (
    permissions.some((permission) => {
      return userPermissions.includes(permission);
    }) ||
    userPermissions.includes("root-access")
  )
    return <>{children}</>;

  if (isPage) return <Navigate to="/unauthorized" />;

  return null;
}
